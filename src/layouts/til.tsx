import * as React from "react";
import matchSorter from "match-sorter";
import { Navigation } from "components/navigation";
import { Container } from "components/container";
import { Header } from "components/header";
import { TILPageProps } from "types";
import { ArticleItem } from "components/article-item";
import { AMAForm } from "components/ama-form";
import { Spacer } from "components/spacer";

export function TILLayout(props: TILPageProps) {
  // states
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
  return (
    <section className="space-y-6 mb-12">
      <Header>
        <Container>
          <Navigation
            current="TIL"
            title="Today I Learned"
            description="I share small notes on things I learn"
            path="/til"
          />
        </Container>
      </Header>

      <Container>
        {showAMA ? (
          <>
            <AMAForm initialValue={filter} onChange={setFilter} />
            <p className="absolute top-0 right-0" style={{ margin: 0 }}>
              <button
                className="text-sm text-gray-500 underline"
                onClick={() => setShowAMA(false)}
              >
                Go back to search?
              </button>
            </p>
          </>
        ) : (
          <>
            <header id="search">
              <h2 className="font-semibold text-2xl">Search Articles</h2>
            </header>

            <form
              role="search"
              onSubmit={handleSubmit}
              className="flex flex-col items-start space-y-2"
            >
              <label htmlFor="ama" className="text-gray-600 text-lg">
                What are you looking for? It will search by title, description,
                or keywords.
              </label>

              <input
                className="bg-white text-black font-semibold border-2 border-gray-900 w-full p-2 text-lg focus:border-blue-500 focus:outline-none resize-none rounded-lg placeholder-gray-500"
                id="ama"
                placeholder="React, SWR, Next..."
                required
                onChange={(event) => setFilter(event.target.value)}
                value={filter}
                aria-required
              />

              <footer className="flex items-baseline w-full space-x-2">
                {filteredArticles.length === 0 ? (
                  <p className="text-sm text-gray-700">
                    <button
                      onClick={() => setShowAMA(true)}
                      className="underline text-left"
                    >
                      Don't find what you are looking for? Click here to ask me
                      and I will write about it
                    </button>
                  </p>
                ) : null}

                <Spacer />

                <p
                  className="text-sm text-gray-700 flex-shrink-0"
                  style={{ lineHeight: "32px" }}
                >
                  {filteredArticles.length} matching articles
                </p>
              </footer>
            </form>
          </>
        )}
      </Container>

      <Container>
        <section className="divide-y divide-gray-200">
          {filteredArticles.map((article) => (
            <ArticleItem key={article.id} article={article.meta} />
          ))}
        </section>
      </Container>
    </section>
  );
}
