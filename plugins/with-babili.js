const BabiliPlugin = require("babili-webpack-plugin");

module.exports = (nextConfig = {}) => {
  return Object.assign({}, nextConfig, {
    webpack(config, { dev, isServer, defaultLoaders, ...options }) {
      if (isServer) console.log("Changing minifier to Babili");

      config.plugins = config.plugins.filter(plugin => {
        return plugin.constructor.name !== "UglifyJsPlugin";
      });

      if (!dev) {
        config.plugins.push(new BabiliPlugin());
      }

      if (typeof nextConfig.webpack === "function") {
        return nextConfig.webpack(config, {
          ...options,
          dev,
          isServer,
          defaultLoaders
        });
      }

      return config;
    }
  });
};
