import { Link } from "collected-notes";

export type Article = {
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
