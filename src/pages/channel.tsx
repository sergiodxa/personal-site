import { GetStaticProps } from "next";
import { ChannelPageProps } from "types";
import { ChannelLayout } from "layouts/channel";
import Airtable from "airtable";
import { ChannelVideo } from "types";

export const getStaticProps: GetStaticProps<ChannelPageProps> = async () => {
  const base = new Airtable({
    apiKey: process.env.AIRTABLE_API_KEY,
  }).base(process.env.AIRTABLE_BASE);

  const table = base("channel") as Airtable.Table<ChannelVideo>;

  const records = await table
    .select({
      maxRecords: 100,
      sort: [{ field: "created_at", direction: "desc" }],
    })
    .firstPage();

  const channel = records.map((record) => ({
    title: record.fields.title,
    url: record.fields.url,
  }));

  return { props: { channel }, revalidate: 5 };
};

export default ChannelLayout;
