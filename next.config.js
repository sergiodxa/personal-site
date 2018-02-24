const withOffline = require("next-offline");
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

module.exports = withOffline(
  withBabili({
    assetPrefix:
      NODE_ENV === "production" ? `https://${alias}` : "http://localhost:3001",

    exportPathMap() {
      return routes;
    }
  })
);
