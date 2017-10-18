const SWPrecacheWebpackPlugin = require('sw-precache-webpack-plugin');
const BabiliPlugin = require('babili-webpack-plugin');

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
          cacheId: 'sergio.now.sh',
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
    return {
      '/': { page: '/' },
      '/essays': { page: '/essays' },
      '/essays/an-accessible-approach-to-frontend-testing': {
        page: '/essays/an-accessible-approach-to-frontend-testing'
      }
    };
  }
};
