const express = require("express");
const next = require("next");
const { parse } = require("url");

const dev = process.env.NODE_ENV !== "production";
const PORT = process.env.PORT || 3001;

const app = next({ dir: ".", dev });
const handle = app.getRequestHandler();

const routes = require("./routes");

app.prepare().then(() => {
  const server = express();
  server.get("*", (req, res) => {
    const parsedUrl = parse(req.url, true);
    const { pathname, query = {} } = parsedUrl;
    const route = routes[pathname];
    if (route) {
      return app.render(req, res, route.page, route.query);
    }
    return handle(req, res);
  });

  server.listen(PORT, err => {
    if (err) throw err;
    console.log(`> Ready on http://localhost:${PORT}`);
  });
});
