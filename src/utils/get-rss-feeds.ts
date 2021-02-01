import Airtable from "airtable";
import { RSSFeed } from "types";

const base = new Airtable({
  apiKey: process.env.AIRTABLE_API_KEY,
}).base(process.env.AIRTABLE_BASE);

export async function getRSSFeeds(limit = 100): Promise<RSSFeed[]> {
  const table = base("feeds") as Airtable.Table<RSSFeed>;

  const records = await table.select({ maxRecords: limit }).firstPage();

  return records.map((record) => record.fields);
}
