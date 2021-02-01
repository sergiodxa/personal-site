import { GetStaticProps, GetStaticPaths } from "next";
import Parser from "rss-parser";
import { FeedPageProps, FeedPageQuery, Feed } from "types";
import { FeedLayout } from "layouts/feed";
import { getRSSFeeds } from "utils/get-rss-feeds";

export const getStaticProps: GetStaticProps<
  FeedPageProps,
  FeedPageQuery
> = async ({ params }) => {
  const id = Number(params.feed);
  const parser = new Parser();
  const feeds = await getRSSFeeds();
  const { url, name } = feeds.find((feed) => feed.id === id);
  const res = await fetch(url);
  const rss = await res.text();
  const feed = ((await parser.parseString(rss)) as unknown) as Feed;
  return { props: { feed, id, name, url }, revalidate: 1 };
};

export const getStaticPaths: GetStaticPaths<FeedPageQuery> = async () => {
  const feeds = await getRSSFeeds();

  const paths = feeds.map((feed) => {
    return { params: { feed: feed.id.toString() } };
  });

  return { paths, fallback: "blocking" };
};

export default FeedLayout;
