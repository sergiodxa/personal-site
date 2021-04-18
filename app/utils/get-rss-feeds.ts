import Airtable from "airtable";
import { RSSFeed } from "../types";

export async function getRSSFeeds(limit = 100): Promise<RSSFeed[]> {
  const base = new Airtable({
    apiKey: process.env.AIRTABLE_API_KEY as string,
  }).base(process.env.AIRTABLE_BASE as string);

  const table = base("feeds") as Airtable.Table<RSSFeed>;

  const records = await table.select({ maxRecords: limit }).firstPage();

  return records.map((record) => record.fields);
}
