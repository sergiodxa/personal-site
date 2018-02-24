const withOffline = require("next-offline");
const BabiliPlugin = require("babili-webpack-plugin");

const routes = require("./server/routes");

module.exports = withOffline({
  webpack(config, { dev }) {
    config.plugins = config.plugins.filter(plugin => {
      return plugin.constructor.name !== "UglifyJsPlugin";
    });

    if (!dev) {
      config.plugins.push(new BabiliPlugin());
    }

    return config;
  },

  exportPathMap() {
    return routes;
  }
});
