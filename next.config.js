const compose = require("compose-function");

const withMDX = require("@zeit/next-mdx")({
  options: {
    mdPlugins: [require("remark-emoji")]
  }
});
const asZone = require("./plugins/as-zone");
const withEnv = require("./plugins/with-env");
const withExportedPages = require("./plugins/with-export-pages");

module.exports = compose(
  withMDX,
  withEnv("NODE_ENV"),
  withExportedPages(),
  asZone("https://sergiodxa.com")
)({
  pageExtensions: ["js", "mdx"]
});
