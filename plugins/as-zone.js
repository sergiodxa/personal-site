const { NODE_ENV = "development" } = process.env;

const isProd = NODE_ENV === "production";

module.exports = alias => (nextConfig = {}) => {
  return Object.assign({}, nextConfig, {
    assetPrefix: isProd ? `https://${alias}` : "http://localhost:3000"
  });
};
