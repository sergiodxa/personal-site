const SWPrecacheWebpackPlugin = require('sw-precache-webpack-plugin');
const BabiliPlugin = require('babili-webpack-plugin');

module.exports = {
  webpack(config, { dev }) {
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
      })
    );

    config.plugins = config.plugins.filter(plugin => {
      return plugin.constructor.name !== 'UglifyJsPlugin'
    })

    if (!dev) {
      config.resolve.alias = {
        react: 'preact-compat/dist/preact-compat',
        'react-dom': 'preact-compat/dist/preact-compat'
      };
      config.plugins.push(new BabiliPlugin())
    }

    return config;
  },

  exportPathMap() {
    return {
      '/': { page: '/' },
      '/essays': { page: '/essays' }
    };
  }
};
