module.exports = {
  images: {
    domains: ['vercel.com'],
  },
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
