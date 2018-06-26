require("now-env");
const compose = require("compose-function");

const withMDX = require("@zeit/next-mdx")({
  options: {
    mdPlugins: [require("remark-abbr"), require("remark-emoji")]
  }
});
const asZone = require("./plugins/as-zone");
const withEnv = require("./plugins/with-env");
const withExportedPages = require("./plugins/with-export-pages");

let alias = process.env.NOW_URL;
try {
  const now = require("./now.prod.json");
  alias = now.alias;
} catch(error) {
  // do nothing 🙃
}

module.exports = compose(
  withMDX,
  withEnv("NODE_ENV"),
  withExportedPages(),
  asZone(alias)
)({
  pageExtensions: ["js", "mdx"]
});
