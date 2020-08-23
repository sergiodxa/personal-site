import Airtable from "airtable";
import { Bookmark } from "types";

const base = new Airtable({
  apiKey: process.env.AIRTABLE_API_KEY,
}).base(process.env.AIRTABLE_BASE);

export async function getBookmarks(limit = 100): Promise<Bookmark[]> {
  const table = base("links") as Airtable.Table<Bookmark>;

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
