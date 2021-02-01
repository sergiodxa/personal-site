import * as React from "react";
import Link from "next/link";
import { Container } from "components/container";
import { Navigation } from "components/navigation";
import { Spacer } from "components/spacer";
import { matchSorter } from "match-sorter";
import { ReaderProps, RSSFeed } from "types";

function FeedItem({ feed }: { feed: RSSFeed }) {
  return (
    <li>
      <Link href={`/reader/${feed.id}`}>
        <a
          rel="noopener noreferrer"
          className="font-semibold underline hover:no-underline text-blue-600 visited:text-indigo-600 dark:text-blue-500 dark:visited:text-indigo-400 text-xl"
        >
          {feed.name}
        </a>
      </Link>
    </li>
  );
}

export function ReaderLayout({ feeds }: ReaderProps) {
  // states
  const [filter, setFilter] = React.useState("");
  // callbacks
  function handleSubmit(event: React.FocusEvent<HTMLFormElement>) {
    event.preventDefault();
  }
  // computed
  const filteredFeeds = matchSorter(feeds, filter, {
    keys: ["name"],
    threshold: matchSorter.rankings.MATCHES,
  });
  // render
  return (
    <section className="space-y-6 mb-12">
      <header>
        <Container>
          <Navigation
            current="reader"
            title="Reader"
            description="A RSS feed reader for the blogs I follow."
            path="/reader"
          />
        </Container>
      </header>

      <Container>
        <section className="mx-auto relative rounded-lg">
          <header id="search">
            <h2 className="font-semibold text-2xl">Search Feeds</h2>
          </header>

          <form
            role="search"
            onSubmit={handleSubmit}
            className="flex flex-col items-start space-y-2"
          >
            <label
              htmlFor="ama"
              className="text-gray-600 dark:text-gray-400 text-lg"
            >
              Search a feed by title.
            </label>

            <input
              className="bg-white text-gray-900 font-semibold border-2 border-gray-900 dark:border-gray-100 w-full p-2 text-lg focus:border-blue-500 focus:outline-none resize-none rounded-lg placeholder-gray-500"
              id="ama"
              placeholder="React, SWR, Next..."
              required
              onChange={(event) => setFilter(event.target.value)}
              value={filter}
              aria-required
            />

            <footer className="flex items-baseline w-full space-x-2">
              <Spacer />

              <p
                className="text-xs text-gray-600 dark:text-gray-400 flex-shrink-0"
                style={{ lineHeight: "32px" }}
              >
                {filteredFeeds.length} matching feeds
              </p>
            </footer>
          </form>
        </section>

        <section>
          <ul className="space-y-4 list-disc list-inside xl:list-outside">
            {filteredFeeds.map((feed) => (
              <FeedItem key={feed.url} feed={feed} />
            ))}
          </ul>
        </section>
      </Container>
    </section>
  );
}
