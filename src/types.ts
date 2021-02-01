import { Note, Site, Link, HTML } from "collected-notes";

export type Courses = "swr" | "react-query";

export type Bookmark = { title: string; url: string };

export type CourseLeads = {
  id?: number;
  email: string;
  status: "subscribed" | "previewed" | "purchased";
  course: "swr" | "react-query";
  createdAt?: string;
};

export type ChannelVideo = { title: string; url: string };

export type RSSFeed = {
  id: number;
  url: string;
  name: string;
};

export type Feedback = {
  path: string;
  email?: string;
  message: string;
  twitter?: string;
  createdAt?: string;
};

export type Meta = {
  slug: string;
  title: string;
  description?: string;
  published: boolean;
  tags?: string;
  lang: "en" | "es";
  date: string;
  canonical_url?: string;
  next?: {
    title: string;
    path: string;
    description: string;
  };
  translated_from?: {
    lang: string;
    title: string;
    path: string;
  };
  cn?: boolean;
  links?: Link[];
};

export type ReducedMeta = Pick<
  Meta,
  "slug" | "title" | "description" | "tags" | "date"
>;

export type ArticlePageProps = {
  note: Note;
  site: Site;
  body: HTML;
  links: Link[];
  meta: Meta;
};

export type ArticlePageQuery = { path: string[] };

export type ArticleListPageProps = {
  site: Site;
  notes: Array<{ meta: ReducedMeta } & Note>;
};

export type HomePageProps = {
  site: Site;
  bookmarks: Bookmark[];
  notes: Array<{ meta: ReducedMeta } & Note>;
};

export type BookmarksPageProps = {
  bookmarks: Bookmark[];
};

export type ChannelPageProps = {
  channel: ChannelVideo[];
};

export type AMAPageProps = {
  site: Site;
  notes: Array<{ meta: ReducedMeta } & Note>;
};

export type TILPageProps = {
  site: Site;
  notes: Array<{ meta: ReducedMeta } & Note>;
};

export type SearchResults = Array<{ meta: ReducedMeta } & Note>;

export type ReaderProps = { feeds: RSSFeed[] };

export type FeedPageProps = {
  id: RSSFeed["id"];
  url: RSSFeed["url"];
  name: RSSFeed["name"];
  feed: Feed;
};

export type FeedPageQuery = { feed: string };

export type FeedItem = {
  guid: string;
  title: string;
  link: string;
  content: string;
  contentSnippet: string;
  isoDate: string;
  pubDate: string;
};

export type Feed = {
  title: string;
  description: string;
  lastBuildDate: string;
  items: FeedItem[];
};
