// jest-puppeteer.config.js
module.exports = {
  lunch: {
    args: "--no-sandbox"
  },
  server: {
    command: "serve dist -p 3000",
    port: 3000
  }
};
