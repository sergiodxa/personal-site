const { NODE_ENV = "development" } = process.env;

const isProd = NODE_ENV === "production";

module.exports = alias => (nextConfig = {}) => {
  if (!isProd) return nextConfig;
  return Object.assign({}, nextConfig, {
    assetPrefix: alias
  });
};
