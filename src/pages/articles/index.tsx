import * as React from "react";
import { GetStaticProps } from "next";
import Navigation from "components/navigation";
import { Article } from "types/article";
import readListArticles from "services/read-list-articles";
import Link from "next/link";
import Tag from "components/tag";
import sortByFrequency from "sortbyfrequency";

interface ArticleParsedTags extends Article {
  tags?: string[];
}

interface ParsedArticle extends ArticleParsedTags {
  date?: string;
}

interface Props {
  articles: ParsedArticle[];
}

export const getStaticProps: GetStaticProps<Props> = async () => {
  const articles = (await readListArticles())
    .map(
      (article): ArticleParsedTags => {
        if (!article.tags) return { ...article, tags: null };
        if (Array.isArray(article.tags)) {
          return { ...article, tags: article.tags };
        }
        return {
          ...article,
          tags: article.tags.split(",").map((tag) => tag.trim().toLowerCase()),
        };
      }
    )
    .map(
      (article): ParsedArticle => {
        return {
          ...article,
          date:
            article.date instanceof Date ? article.date.toJSON() : article.date,
        };
      }
    );

  return { props: { articles } };
};

export default function ResumePage(props: Props) {
  // const { data: articles } = useLinks(props.articles);

  const [query, setQuery] = React.useState("");
  const [showMoreTags, setShowMoreTags] = React.useState(false);

  const tags = sortByFrequency(
    props.articles
      .filter((article) => article.tags)
      .flatMap((article) => article.tags)
  ).slice(0, showMoreTags ? -1 : 10);

  const filteredArticles = props.articles
    .filter(filterOnlyPublished)
    .filter(filterByTitleAndTags.bind(null, query));

  return (
    <>
      <Navigation />
      <main id="hero" className="max-w-screen-lg mx-auto px-4 space-y-8 mb-8">
        <h1 className="font-semibold text-2xl md:text-4xl tracking-widest leading-none">
          Articles
        </h1>

        <p className="text-md md:text-lg tracking-wide border-l-4 border-yellow-500 pl-4 -ml-4 leading-none">
          List of articles I have wrote with the time, sorted by creation date,
          below you can search for what article you want.
        </p>

        <div className="space-y-2">
          <div className="relative">
            <input
              className="text-yellow-500 w-full py-2 pl-4 pr-12 bg-black border border-white focus:outline-none focus:border-yellow-500 rounded-lg"
              type="search"
              value={query}
              onChange={(event) => setQuery(event.target.value)}
              placeholder="Search article"
            />
            <span className="absolute top-0 right-0 bottom-0 py-2 px-4 select-none">
              {filteredArticles.length}
            </span>
          </div>
          <div className="flex items-center flex-wrap">
            {tags.map((tag) => (
              <button
                key={tag}
                type="button"
                onClick={() => setQuery(tag)}
                className="focus:outline-none select-none mr-1 my-1"
              >
                <Tag key={tag}>{tag}</Tag>
              </button>
            ))}
          </div>
          <button
            type="button"
            onClick={() => setShowMoreTags((current) => !current)}
            className="focus:outline-none select-none text-sm"
          >
            {showMoreTags ? <>See less tags</> : <>See more tags</>}
          </button>
        </div>

        <section className="space-y-4 md:max-w-screen-md md:mx-auto">
          {filteredArticles
            .map((article) => ({ ...article, date: new Date(article.date) }))
            .sort((a, b) => b.date.getTime() - a.date.getTime())
            .map((article) => (
              <ArticleItem key={article.slug} {...article} />
            ))}
        </section>
      </main>
    </>
  );
}

function ArticleItem({ slug, title }: Article) {
  return (
    <article>
      <Link href="/articles/[...slug]" as={slug}>
        <a title={title} className="underline text-yellow-500">
          <h3 className="text-md md:text-lg tracking-wider leading-normal font-semibold">
            {title}
          </h3>
        </a>
      </Link>
    </article>
  );
}

function filterOnlyPublished(article: ParsedArticle) {
  return article.published;
}

function filterByTitleAndTags(query, article: ParsedArticle) {
  if (!query) return true;
  if (article.title.toLowerCase().includes(query)) return true;
  if (article.tags?.includes(query.toLowerCase())) return true;
  return false;
}
