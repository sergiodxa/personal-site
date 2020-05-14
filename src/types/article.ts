export interface Article {
  title?: string;
  slug?: string;
  description?: string;
  date?: Date | string;
  lang?: string;
  content: string;
  canonical_url?: string;
  youtube?: string;
  published?: boolean;
  social?: string;
  next?: NextArticle;
  tags?: string | string[];
  translated_to?: TranslatedTo[];
  translated_from?: TranslatedFrom;
}

interface TranslatedFrom {
  lang: string;
  title: string;
  path: string;
}

interface TranslatedTo {
  lang: string;
  path: string;
}

interface NextArticle {
  title: string;
  description?: string;
  path: string;
}
