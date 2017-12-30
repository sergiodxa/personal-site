const fs = require('fs');
const { promisify } = require('util');

const atom = require('./lib/atom.js');

const writeFile = promisify(fs.writeFile);

async function main() {
  await writeFile('./portfolio/atom', atom());
  return true;
}

main()
  .then(() => console.log('File generated!'))
  .catch(error => console.error(error));
