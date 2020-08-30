// @ts-check
require("dotenv").config();
global.fetch = require("node-fetch");
const { collectedNotes } = require("collected-notes");

const { CN_EMAIL, CN_TOKEN, CN_SITE_PATH } = process.env;

async function main() {
  const cn = collectedNotes(CN_EMAIL, CN_TOKEN);

  const { site, notes } = await cn.site(CN_SITE_PATH, 1, "public_site");

  // fetch all pages
  if (notes.length < site.total_notes) {
    for await (let page of Array.from(
      { length: Math.ceil(site.total_notes / 40) },
      (_, index) => index + 1
    )) {
      if (page === 1) continue;
      const res = await cn.site(CN_SITE_PATH, page, "public_site");
      notes.push(...res.notes);
    }
  }

  const publicNotes = notes.filter((note) => note.visibility === "public_site");

  await Promise.all(
    publicNotes.map((note) =>
      fetch(
        `https://collectednotes.com/sites/${site.id}/notes/${note.id}`,
        {
          method: "PUT",
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
            Authorization: `${CN_EMAIL} ${CN_TOKEN}`,
          },
          body: JSON.stringify({
            note: { body: note.body, visibility: "public" },
          }),
        }
      )
    )
  );
}

main().catch((error) => {
  console.error(error);
  process.exit(1);
});
