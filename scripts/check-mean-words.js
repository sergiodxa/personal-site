const fs = require("fs");
const glob = require("globby");
const { promisify } = require("util");

const readFile = promisify(fs.readFile);

async function main() {
  const filePaths = await glob(["./pages/**/*.mdx"]);

  const files = await Promise.all(
    filePaths.map(filePath => readFile(filePath, "utf8"))
  );

  const matches = files.map(fileContent => {
    return fileContent.match(
      /\s(obviously|basically|simply|of course|clearly|just|everyone knows|however|so|easy|obviamente|básicamente|simplemente|por supuesto|claramente|solo|todo el mundo lo sabe|tan|fácil)\s/gim
    );
  });

  if (!matches.some(match => match !== null)) {
    return console.log("Everything looks good, nice job!");
  }

  const res = matches
    .map((match, index) => {
      const file = filePaths[index];
      return { match, file };
    })
    .filter(({ match }) => match !== null)
    .reduce((acc, { match, file }) => {
      const matchesGroup = match
        .map(word => word.toLowerCase().trim())
        .reduce((acc, word) => ({ ...acc, [word]: (acc[word] || 0) + 1 }), {});

      const matchesStr = Object.entries(matchesGroup)
        .map(([word, amount]) => `${word} (${amount})`)
        .join(", ");

      return `${acc}\n\nThe words ${matchesStr} were found under the file ${file}`;
    }, "");

  console.log(res);
  process.exit(1);
}

main().catch(error => console.log(error));
