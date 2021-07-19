module.exports = {
  appDirectory: "app",
  browserBuildDirectory: "public/build",
  publicPath: "/build/",
  serverBuildDirectory: "server/build",
  devServerPort: 8002,
  routes(defineRoutes) {
    return defineRoutes((route) => {
      route("/articles/*", "views/article.tsx");
    });
  },
};
