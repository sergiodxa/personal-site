import { GetStaticProps } from "next";
import { ReaderProps } from "types";
import { ReaderLayout } from "layouts/reader";
import { getRSSFeeds } from "utils/get-rss-feeds";

export const getStaticProps: GetStaticProps<ReaderProps> = async () => {
  const feeds = await getRSSFeeds();
  return { props: { feeds }, revalidate: 120 };
};

export default ReaderLayout;
