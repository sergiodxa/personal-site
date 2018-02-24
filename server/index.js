const express = require("express");
const next = require("next");
const { join } = require("path");
const { parse } = require("url");
const LRUCache = require("lru-cache");

const dev = process.env.NODE_ENV !== "production";
const PORT = process.env.PORT || 3001;

const app = next({ dir: ".", dev });
const handle = app.getRequestHandler();

const routes = require("./routes");

const ssrCache = new LRUCache({
  max: 100,
  maxAge: 1000 * 60 * 60 // 1hour
});

function getCacheKey(req) {
  return `${req.url}`;
}

async function renderAndCache(req, res, pagePath, queryParams) {
  const key = getCacheKey(req);

  if (ssrCache.has(key)) {
    res.setHeader("X-Cache", "HIT");
    res.send(ssrCache.get(key));
    return;
  }

  try {
    const html = await app.renderToHTML(req, res, pagePath, queryParams);

    if (res.statusCode !== 200) {
      res.send(html);
      return;
    }

    ssrCache.set(key, html);

    res.setHeader("X-Cache", "MISS");
    res.send(html);
  } catch (err) {
    app.renderError(err, req, res, pagePath, queryParams);
  }
}

app.prepare().then(() => {
  const server = express();

  server.get("/service-worker.js", (req, res) => {
    const { pathname } = parse(req.url);
    const filePath = join(__dirname, "..", ".next", pathname);
    app.serveStatic(req, res, filePath);
  });

  server.get("/atom", (req, res) => {
    const { pathname } = parse(req.url);
    const filePath = join(__dirname, "..", ".next", pathname);
    app.serveStatic(req, res, filePath);
  });

  server.get("/_next/**", (req, res) => {
    res.append("Cache-Control", "max-age=31536000");
    res.append("Cache-Control", "immutable");
    return handle(req, res);
  });

  server.get("*", (req, res) => {
    const parsedUrl = parse(req.url, true);
    const { pathname, query = {} } = parsedUrl;
    const route = routes[pathname];
    if (route) {
      return renderAndCache(req, res, route.page, route.query);
    }
    return handle(req, res);
  });

  server.listen(PORT, err => {
    if (err) throw err;
    console.log(`> Ready on http://localhost:${PORT}`);
  });
});
