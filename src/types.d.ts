import { Note, Site, Link, HTML } from "collected-notes";

export type Bookmark = { title: string; url: string };

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
  notes: Array<
    { meta: Pick<Meta, "slug" | "title" | "description" | "tags"> } & Note
  >;
};

export type SearchPageProps = { site: Site };

export type HomePageProps = {
  site: Site;
  bookmarks: Bookmark[];
  notes: Array<
    { meta: Pick<Meta, "slug" | "title" | "description" | "tags"> } & Note
  >;
};
