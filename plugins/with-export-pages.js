const glob = require("globby");

const { NODE_ENV = "development" } = process.env;

const stripFSData = route => route.slice(7, route.length - 3);
const changeIndexPath = route => (route === "/index" ? "/" : route);
const mergePages = (routes, route) => ({
  ...routes,
  [route]: { page: route }
});

module.exports = (...configRegex) => (nextConfig = {}) => {
  if (NODE_ENV !== "production") return nextConfig;
  const regex =
    configRegex.length > 0 ? configRegex : ["./pages/**/*.js", "!./pages/_*"];

  return Object.assign({}, nextConfig, {
    async exportPathMap() {
      return (await glob(regex))
        .map(stripFSData)
        .map(changeIndexPath)
        .reduce(mergePages, {});
    }
  });
};
