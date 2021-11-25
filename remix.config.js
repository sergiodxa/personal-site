/* eslint-disable unicorn/prefer-module */
module.exports = {
  appDirectory: "app",
  browserBuildDirectory: "public/build",
  publicPath: "/build/",
  serverBuildDirectory: "api/build",
  devServerPort: 8002,
  routes(defineRoutes) {
    return defineRoutes((route) => {
      route("/articles/*", "views/article.tsx");
    });
  },
};
