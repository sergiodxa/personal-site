const SWPrecacheWebpackPlugin = require('sw-precache-webpack-plugin')

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
    )

    if (!dev) {
      config.resolve.alias = {
        react: 'preact-compat/dist/preact-compat',
        'react-dom': 'preact-compat/dist/preact-compat'
      }
    }

    return config
  },

  exportPathMap() {
    return {
      '/': { page: '/' },
      '/essays': { page: '/essays' }
    }
  }
}
