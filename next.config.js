const compose = require("compose-function");
const withOffline = require("next-offline");
const withMDX = require("@zeit/next-mdx")({
  options: {
    mdPlugins: [
      require("remark-abbr"),
      require("remark-emoji")
    ]
  }
});
const BabiliPlugin = require("babili-webpack-plugin");

const routes = require("./server/routes");

const { NODE_ENV } = process.env;
const { alias } = require("./now.json");

const withBabili = (nextConfig = {}) => {
  return Object.assign({}, nextConfig, {
    webpack(config, options) {
      if (!options.defaultLoaders) {
        throw new Error(
          "This plugin is not compatible with Next.js versions below 5.0.0 https://err.sh/next-plugins/upgrade"
        );
      }

      config.plugins = config.plugins.filter(plugin => {
        return plugin.constructor.name !== "UglifyJsPlugin";
      });

      if (!options.dev) {
        config.plugins.push(new BabiliPlugin());
      }

      return config;
    }
  });
};

const withExportPathMap = {
  exportPathMap() {
    return routes;
  }
}

const config = {
  assetPrefix:
    NODE_ENV === "production" ? `https://${alias}` : "http://localhost:3001",
}

if (NODE_ENV === "production") Object.assign(config, withExportPathMap);

module.exports = compose(withMDX, withOffline, withBabili)(config);
