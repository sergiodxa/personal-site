import Airtable from "airtable";
import { Bookmark } from "../types";

export async function getBookmarks(limit = 100): Promise<Bookmark[]> {
  const base = new Airtable({
    apiKey: process.env.AIRTABLE_API_KEY as string,
  }).base(process.env.AIRTABLE_BASE as string);

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
