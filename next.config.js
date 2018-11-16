const compose = require("compose-function");

const withMDX = require("@zeit/next-mdx")({
  options: {
    mdPlugins: [require("remark-emoji")]
  }
});
const asZone = require("./plugins/as-zone");
const withEnv = require("./plugins/with-env");
const withExportedPages = require("./plugins/with-export-pages");

let { alias } = require("./now.json");

module.exports = compose(
  withMDX,
  withEnv("NODE_ENV"),
  withExportedPages(),
  asZone(`https://${alias}`)
)({
  pageExtensions: ["js", "mdx"]
});
