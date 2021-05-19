/* eslint-disable unicorn/prefer-module */
module.exports = {
  apps: [
    {
      name: "PostCSS",
      script: "yarn dev:css",
      ignore_watch: ["."],
      env: {
        NODE_ENV: "development",
      },
    },
    {
      name: "Remix",
      script: "yarn dev:app",
      ignore_watch: ["."],
      env: {
        NODE_ENV: "development",
      },
    },
    {
      name: "Vercel",
      script: "yarn start",
      ignore_watch: ["."],
      env: {
        NODE_ENV: "development",
      },
    },
  ],
};
