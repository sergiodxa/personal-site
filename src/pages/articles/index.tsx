import * as React from "react";
import { GetStaticProps } from "next";
import Navigation from "components/navigation";
import { Article } from "types/article";
import readListArticles from "services/read-list-articles";
import Link from "next/link";
import Tag from "components/tag";
import sortByFrequency from "sortbyfrequency";
import Router, { useRouter } from "next/router";
import Title from "components/title";
import Description from "components/description";
import { Input } from "components/input";
import clsx from "clsx";
import { motion, AnimatePresence } from "framer-motion";
import { useLockBodyScroll } from "hooks/use-lock-body-scroll";
import { useOnEscapePress } from "hooks/use-on-escape-press";
import { Toast } from "components/toast";
import { useMatchMedia } from "hooks/use-match-media";

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

export default function ArticlesPage(props: Props) {
  const {
    query: { query = "" },
  }: { query: { query?: string } } = useRouter();

  const [tagsLimit, setTagsLimit] = React.useState(10);

  const setTagLimit = React.useCallback(() => setTagsLimit(10), [setTagsLimit]);

  const removeTagLimit = React.useCallback(() => setTagsLimit(Infinity), [
    setTagsLimit,
  ]);

  const setQuery = React.useCallback((query) => {
    if (query.trim() === "") {
      Router.push({ pathname: "/articles" }, undefined, { shallow: true });
    } else {
      Router.push({ pathname: "/articles", query: { query } }, undefined, {
        shallow: true,
      });
    }
  }, []);

  const tags = sortByFrequency(getFlatFilters(props.articles));

  const filteredArticles = props.articles
    .filter(filterOnlyPublished)
    .filter(filterByTitleAndTags.bind(null, query));

  return (
    <>
      <Navigation />
      <main id="hero" className="max-w-screen-md mx-auto px-4 space-y-8 mb-8">
        <Title>Articles</Title>

        <Description>
          List of articles I have wrote with the time, sorted by creation date,
          below you can search for what article you want.
        </Description>

        <div className="space-y-2">
          <div className="relative">
            <Input
              type="search"
              value={query}
              onChange={(event) => setQuery(event.target.value)}
              placeholder="Search article"
            />
            <span className="absolute top-0 right-0 bottom-0 py-2 px-4 select-none">
              {filteredArticles.length}
            </span>
          </div>
          <div>
            <TagCloud
              tags={tags}
              active={query}
              onTag={(tag) => {
                setQuery(tag);
                setTagLimit();
              }}
              limit={tagsLimit}
              close={setTagLimit}
            />
          </div>
          <button
            type="button"
            onClick={() =>
              tagsLimit === Infinity ? setTagLimit() : removeTagLimit()
            }
            className="focus:outline-none select-none text-xs hidden md:inline-block text-yellow-500 light:text-indigo-500"
          >
            {tagsLimit === Infinity ? <>See less tags</> : <>See all tags</>}
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
        <a
          title={title}
          className="underline text-yellow-500 light:text-indigo-500"
        >
          <h3 className="text-md md:text-lg tracking-wider leading-normal font-semibold">
            {title}
          </h3>
        </a>
      </Link>
    </article>
  );
}

function TagCloud({
  tags,
  onTag,
  active,
  limit = Infinity,
  close = () => undefined,
}: {
  tags: string[];
  onTag: (tag: string) => void;
  limit: number;
  active: string;
  close: () => void;
}) {
  const [toastIsOpen, setToastIsOpen] = React.useState(true);
  const isFull = limit === Infinity;

  const cn = clsx("bg-black light:bg-white", {
    relative: limit !== Infinity,
    "xl:fixed xl:inset-0 z-10 xl:overflow-y-auto": isFull,
  });

  function handleClick(event: React.MouseEvent<HTMLButtonElement>) {
    onTag(event.currentTarget.dataset.tag);
  }

  const isDesktop = useMatchMedia("min-width: 1280px", false);

  useLockBodyScroll(isFull && isDesktop);
  useOnEscapePress(close);

  return (
    <>
      <motion.div className={cn} animate>
        <div className="flex items-center flex-wrap justify-start">
          <AnimatePresence>
            {tags.slice(0, limit).map((tag) => (
              <motion.button
                key={tag}
                type="button"
                onClick={handleClick}
                data-tag={tag}
                className="focus:outline-none focus:shadow-outline select-none mr-1 my-1"
                exit={{ opacity: 0 }}
              >
                <Tag key={tag} active={tag === active.trim()}>
                  {tag}
                </Tag>
              </motion.button>
            ))}
          </AnimatePresence>
        </div>
      </motion.div>
      <div className="sr-only xl:not-sr-only fixed right-0 top-0">
        <AnimatePresence>
          {isFull && toastIsOpen && (
            <Toast
              type="tip"
              label={
                <>
                  Press <kbd className="text-md text-pink-500">Esc</kbd> to close the tag cloud
                </>
              }
              onClick={() => setToastIsOpen(false)}
            />
          )}
        </AnimatePresence>
      </div>
    </>
  );
}

function getFlatFilters(articles: ParsedArticle[]) {
  return articles
    .filter((article) => article.tags)
    .flatMap((article) => article.tags);
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
