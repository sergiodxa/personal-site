const fs = require("fs");
const { promisify } = require("util");
const glob = require("globby");

const writeFile = promisify(fs.writeFile);

const BASE_URL = "https://sergiodxa.com";

async function main() {
  const routes = await glob(["./pages/**/*.js", "!./pages/_*"]);

  const urls = routes
    .map(route => route.substring(7, route.length - 3))
    .map(route => (route === "/index" ? "/" : route))
    .map(route => {
      const priority =
        (100 - route.split("/").filter(section => section !== "").length * 15) /
        100;
      return { route, priority };
    })
    .sort((a, b) => {
      if (a.priority > b.priority) return -1;
      if (a.priority < b.priority) return 1;
      return 0;
    })
    .map(
      ({ route, priority }) => `<url>
  <loc>${BASE_URL}${route}</loc>
  <lastmod>${new Date().toJSON()}</lastmod>
  <priority>${priority}</priority>
</url>`
    )
    .join("\n");

  const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
  <urlset
        xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"
        xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
        xsi:schemaLocation="http://www.sitemaps.org/schemas/sitemap/0.9
              http://www.sitemaps.org/schemas/sitemap/0.9/sitemap.xsd">

${urls}
</urlset>`;

  await writeFile("./dist/sitemap.xml", sitemap);
  return true;
}

main()
  .then(() => console.log("Sitemap generated!"))
  .catch(error => console.error(error));
