import * as React from "react";
import matchSorter from "match-sorter";
import { Navigation } from "components/navigation";
import { Header } from "components/header";
import { Container } from "components/container";
import { Spacer } from "components/spacer";
import { DesktopOnly } from "components/media-query";
import { Memoji, MemojiName } from "components/memoji";
import { ArticleListPageProps } from "types";
import { AMAForm } from "components/ama-form";
import { ArticleItem } from "components/article-item";

export function ArticlesListLayout(props: ArticleListPageProps) {
  // states
  const [memoji, setMemoji] = React.useState<MemojiName>("working");
  const [filter, setFilter] = React.useState("");
  const [showAMA, setShowAMA] = React.useState(false);
  // computed
  const filteredArticles = matchSorter(props.notes, filter, {
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
  // render
  return (
    <>
      <Header>
        <Container>
          <Navigation
            current="articles"
            title="Articles"
            description="All the articles I have wrote in my career"
            path="/articles"
          />

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
                key={article.id}
                article={article.meta}
                onTagClick={filterByTag}
              />
            ))}
          </section>
        ) : null}
      </Container>
    </>
  );
}
