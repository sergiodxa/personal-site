const SWPrecacheWebpackPlugin = require('sw-precache-webpack-plugin');
const BabiliPlugin = require('babili-webpack-plugin');

const routes = require('./server/routes');

module.exports = {
  webpack(config, { dev }) {
    config.plugins = config.plugins.filter(plugin => {
      return plugin.constructor.name !== 'UglifyJsPlugin';
    });

    if (!dev) {
      config.plugins.push(
        new SWPrecacheWebpackPlugin({
          verbose: true,
          staticFileGlobsIgnorePatterns: [/\.next\//],
          minify: !dev,
          cacheId: 'sergiodxa.com',
          runtimeCaching: [
            {
              handler: 'networkFirst',
              urlPattern: /^https?.*/
            }
          ]
        }),
        new BabiliPlugin()
      );
    }

    return config;
  },

  exportPathMap() {
    return routes;
  }
};
