require("now-env");
const compose = require("recompose/compose").default;

const withOffline = require("next-offline");
const withMDX = require("@zeit/next-mdx")({
  options: {
    mdPlugins: [require("remark-abbr"), require("remark-emoji")]
  }
});
const asZone = require("./plugins/as-zone");
const withEnv = require("./plugins/with-env");
const withExportedPages = require("./plugins/with-export-pages");

const { alias } = require("./now.json");

module.exports = compose(
  withMDX,
  withOffline,
  withEnv("NODE_ENV"),
  withExportedPages(),
  asZone(alias)
)({
  pageExtensions: ["js", "mdx"]
});
