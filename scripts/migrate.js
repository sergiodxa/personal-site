// @ts-check
require("dotenv").config();
global.fetch = require("node-fetch");
const { collectedNotes } = require("collected-notes");
const globby = require("globby");
const fs = require("fs");
const { promisify } = require("util");
const matter = require("gray-matter");

const readFile = promisify(fs.readFile);

const {
  CN_EMAIL,
  CN_TOKEN,
  CN_SITE_ID,
  CN_SITE_PATH,
  CONTENT_DIR,
} = process.env;

async function main() {
  const cn = collectedNotes(CN_EMAIL, CN_TOKEN);

  const paths = await globby(`./${CONTENT_DIR}/**/*.mdx`, { absolute: false });

  const slugs = paths.map((path) =>
    path.slice(`./${CONTENT_DIR}/`.length, path.length - ".mdx".length)
  );

  await Promise.all(
    paths.map(async (path, index) => {
      const file = await readFile(path, "utf-8");
      const { content, data } = matter(file);
      data.path = slugs[index];
      const visibility = data.published ? "public" : "private";
      return cn.create(
        {
          body: matter.stringify(`# ${data.title}\n${content}`, data),
          visibility,
        },
        Number(CN_SITE_ID)
      );
    })
  );
}

main().catch((error) => {
  console.error(error);
  process.exit(1);
});
