const glob = require("globby");

const { NODE_ENV = "development" } = process.env;

const stripFSData = route => {
  if (route.endsWith(".mdx"))
    return route.slice("./pages".length, route.length - ".mdx".length);
  return route.slice("./pages".length, route.length - ".js".length);
};
const changeIndexPath = route => (route === "/index" ? "/" : route);
const mergePages = (routes, route) => ({
  ...routes,
  [route]: { page: route }
});

module.exports = (...configRegex) => (nextConfig = {}) => {
  if (NODE_ENV !== "production") return nextConfig;
  const regex =
    configRegex.length > 0
      ? configRegex
      : ["./pages/**/*.js", "./pages/**/*.mdx", "!./pages/_*"];

  return Object.assign({}, nextConfig, {
    async exportPathMap() {
      return (await glob(regex))
        .map(stripFSData)
        .map(changeIndexPath)
        .reduce(mergePages, {});
    }
  });
};
