module.exports = {
  async redirects() {
    return [
      {
        source: '/uses',
        destination: '/articles/uses',
        permanent: true,
      },
    ]
  },
}