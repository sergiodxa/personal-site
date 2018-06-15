const { EnvironmentPlugin } = require("webpack");

module.exports = (...envKeys) => (nextConfig = {}) => {
  return Object.assign({}, nextConfig, {
    webpack(config, { isServer }) {
      if (isServer) console.log("Applying environment variables", ...envKeys);
      config.plugins.push(new EnvironmentPlugin(envKeys));

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
