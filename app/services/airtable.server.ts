import Airtable, { FieldSet } from "airtable";

if (!process.env.AIRTABLE_API_KEY) {
  throw new Error("Missing AIRTABLE_API_KEY env variable");
}

if (!process.env.AIRTABLE_BASE) {
  throw new Error("Missing AIRTABLE_BASE env variable");
}

export type Bookmark = FieldSet & {
  title: string;
  url: string;
};

export async function getBookmarks(limit = 100): Promise<Bookmark[]> {
  const base = new Airtable({
    apiKey: process.env.AIRTABLE_API_KEY as string,
  }).base(process.env.AIRTABLE_BASE as string);

  const table = base<Bookmark>("links");

  const records = await table
    .select({
      maxRecords: limit,
      sort: [{ field: "created_at", direction: "desc" }],
    })
    .firstPage();

  return records.map((record) => ({
    title: record.fields.title,
    url: record.fields.url,
  }));
}
