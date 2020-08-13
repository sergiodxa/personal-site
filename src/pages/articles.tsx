import * as React from "react";
import { GetStaticPropsResult } from "next";
import Router, { useRouter } from "next/router";
import Link from "next/link";
import matchSorter from "match-sorter";
import { Navigation } from "components/navigation";
import { Header } from "components/header";
import { Container } from "components/container";
import { Spacer } from "components/spacer";
import { DesktopOnly } from "components/media-query";
import { Memoji, MemojiName } from "components/memoji";
import { getListOfArticles } from "utils/get-list-of-articles";
import { Article } from "types/article";
import { AMAForm } from "components/ama-form";

type ReducerArticle = Pick<Article, "slug" | "title" | "description" | "tags">;

type Props = {
  articles: Array<ReducerArticle>;
};

export async function getStaticProps(): Promise<GetStaticPropsResult<Props>> {
  const articles = await getListOfArticles();
  return {
    revalidate: 1,
    props: {
      articles: articles
        .filter((article) => article.published)
        .map<ReducerArticle>((article) => ({
          slug: article.slug,
          title: article.title,
          description: article.description ?? "",
          tags: article.tags ?? "",
        })),
    },
  };
}
function ArticleItem({
  article,
  onTagClick,
}: {
  article: ReducerArticle;
  onTagClick(tag: string): void;
}) {
  return (
    <article>
      <header>
        <Link href={article.slug}>
          <a className="font-semibold underline hover:no-underline text-white visited:text-gray-500">
            <h3 className="text-lg">{article.title}</h3>
          </a>
        </Link>
      </header>

      {article.description ? (
        <p className="border-l-4 border-orange-500 pl-2 py-1 leading-normal text-sm -ml-3">
          {article.description}
        </p>
      ) : null}

      {article.tags ? (
        <footer className="space-x-2">
          {article.tags
            .split(/\,\s?/)
            .map((tag) => tag.toLowerCase())
            .sort()
            .map((tag) => (
              <button
                onClick={() => onTagClick(tag)}
                className="text-xs bg-gray-900 text-blue-400 px-2 leading-relaxed inline-block"
              >
                {tag}
              </button>
            ))}
        </footer>
      ) : null}
    </article>
  );
}

export default function Articles(props: Props) {
  // states
  const { asPath } = useRouter();
  const [memoji, setMemoji] = React.useState<MemojiName>("working");
  const [filter, setFilter] = React.useState("");
  const [showAMA, setShowAMA] = React.useState(false);
  // computed
  const filteredArticles = matchSorter(props.articles, filter, {
    keys: ["title", "description", "tags"],
    threshold: matchSorter.rankings.MATCHES,
  });
  // callbacks
  function handleSubmit(event: React.FocusEvent<HTMLFormElement>) {
    event.preventDefault();
  }
  function filterByTag(tag: string) {
    if (window.screenTop !== 0) {
      window.scrollTo({
        top: 0,
        left: 0,
        behavior: "smooth",
      });
    }
    setFilter(tag);
  }
  // effects
  React.useEffect(() => {
    if (filter !== "" && !showAMA) {
      Router.replace("/articles", `/articles?search=${filter}`);
    } else if (asPath !== "articles") {
      Router.replace("/articles", `/articles`);
    }
  }, [filter]);
  // render
  return (
    <>
      <Header>
        <Container>
          <Navigation current="articles" title="Articles" />

          <aside className="flex items-start mb-4 space-x-4">
            <div className="mt-4 space-y-2">
              <h2
                className="text-xl leading-7 font-semibold"
                style={{
                  background: "linear-gradient(45deg, #ED8936, #F6E05E)",
                  backgroundClip: "text",
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                }}
              >
                Articles
              </h2>
              <p className="leading-7">
                All the articles I have wrote in my career, search for what you
                want in the form below.
              </p>
            </div>

            <Spacer />

            <figure className="flex-shrink-0">
              <DesktopOnly>
                <Memoji name={memoji} width={210} />
              </DesktopOnly>
            </figure>
          </aside>
        </Container>
      </Header>

      <Container>
        <section className="space-y-2 mb-4 -mt-6 md:-mt-12 bg-black p-4 rounded-lg border-gray-900 border-4 relative">
          {showAMA ? (
            <>
              <AMAForm
                initialMemoji="working"
                initialValue={filter}
                onChange={setFilter}
                setMemoji={setMemoji}
              />
              <p
                className="absolute top-0 right-0 pt-4 pr-4"
                style={{ margin: 0 }}
              >
                <button
                  className="text-xs text-gray-500 underline"
                  onClick={() => setShowAMA(false)}
                >
                  Go back to search?
                </button>
              </p>
            </>
          ) : (
            <>
              <header id="search">
                <h2 className="font-semibold">Search Articles</h2>
              </header>

              <form
                role="search"
                onSubmit={handleSubmit}
                className="flex flex-col items-start space-y-2"
              >
                <label htmlFor="ama" className="text-gray-600 text-sm">
                  Search an article, it will give by title, description, or
                  keywords.
                </label>

                <input
                  className="bg-black border-2 border-gray-900 w-full p-2 text-sm focus:outline-none focus:border-blue-500 focus:bg-gray-900 text-gray-100 resize-none rounded placeholder-gray-700 focus:placeholder-gray-400"
                  id="ama"
                  placeholder="React, SWR, Next..."
                  required
                  onChange={(event) => setFilter(event.target.value)}
                  value={filter}
                  aria-required
                />

                <footer className="flex items-baseline w-full space-x-2">
                  {filteredArticles.length === 0 ? (
                    <p className="text-xs text-gray-500">
                      <button
                        onClick={() => setShowAMA(true)}
                        className=" underline text-left"
                      >
                        Don't find what you are looking for? Click here to ask
                        me and I will write about it
                      </button>
                    </p>
                  ) : null}
                  <Spacer />

                  <p
                    className="text-xs text-gray-500 flex-shrink-0"
                    style={{ lineHeight: "32px" }}
                  >
                    {filteredArticles.length} matching articles
                  </p>
                </footer>
              </form>
            </>
          )}
        </section>

        {!showAMA ? (
          <section className="space-y-4 mb-12 px-4 border-l-4 border-r-4 border-black">
            {filteredArticles.map((article) => (
              <ArticleItem
                key={article.title}
                article={article}
                onTagClick={filterByTag}
              />
            ))}
          </section>
        ) : null}
      </Container>
    </>
  );
}
