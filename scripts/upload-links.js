// @ts-check
require("dotenv").config();
const Airtable = require("airtable");
const fs = require("fs");
const { promisify } = require("util");
const { resolve } = require("path");
const matter = require("gray-matter");

const { AIRTABLE_API_KEY, AIRTABLE_BASE } = process.env;

const readFile = promisify(fs.readFile);

const base = new Airtable({
  apiKey: AIRTABLE_API_KEY,
}).base(AIRTABLE_BASE);
const table = base("links");

async function main() {
  const raw = await readFile(resolve("./links.yml"), "utf-8");

  /**
   * @type {Array<{ title:string; url:string }>}
   */
  const links = matter(raw).data.links;
  for await (const link of links.reverse()) {
    const record = { fields: { ...link, created_at: new Date() } };
    await table.create([record]);
  }
}

main().catch((error) => {
  console.error(error);
  process.exit(1);
});
