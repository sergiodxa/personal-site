module.exports = {
  images: {
    domains: ["vercel.com"],
  },
  async redirects() {
    return [
      {
        source: "/uses",
        destination: "/articles/uses",
        permanent: true,
      },
      {
        source: "/about",
        destination: "/articles/about",
        permanent: true,
      },
      {
        source: "/oss",
        destination: "https://github.com/sergiodxa",
        permanent: false,
      },
    ];
  },
};
