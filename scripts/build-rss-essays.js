const fs = require("fs");
const { promisify } = require("util");

const feed = require("./lib/essays.js");

const writeFile = promisify(fs.writeFile);

async function main() {
  await writeFile("./dist/atom", feed());
  return true;
}

main()
  .then(() => console.log("RSS generated!"))
  .catch(error => console.error(error));
