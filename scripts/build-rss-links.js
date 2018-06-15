const fs = require("fs");
const { promisify } = require("util");

const feed = require("./lib/links.js");

const writeFile = promisify(fs.writeFile);

async function main() {
  await writeFile("./dist/links/atom", feed());
  return true;
}

main()
  .then(() => console.log("RSS generated!"))
  .catch(error => console.error(error));
