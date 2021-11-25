/* eslint-disable unicorn/prefer-module */
/**
 * @type {import('@remix-run/dev/config').AppConfig}
 */
module.exports = {
  serverBuildDirectory: "api/build",
  routes(defineRoutes) {
    return defineRoutes((route) => {
      route("/articles/*", "views/article.tsx");
    });
  },
};
