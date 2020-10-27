import * as React from "react";
import { Header } from "components/header";
import { Container } from "components/container";
import { Navigation } from "components/navigation";
import { Spacer } from "components/spacer";
import { matchSorter } from "match-sorter";
import { BookmarksPageProps, Bookmark } from "types";

function BookmarkItem({ link }: { link: Bookmark }) {
  return (
    <li>
      <a
        href={link.url}
        rel="noopener noreferrer"
        className="font-semibold underline hover:no-underline text-blue-600 visited:text-indigo-600 text-xl"
      >
        {link.title}
      </a>
    </li>
  );
}

export function BookmarksLayout(props: BookmarksPageProps) {
  // states
  const [filter, setFilter] = React.useState("");
  // callbacks
  function handleSubmit(event: React.FocusEvent<HTMLFormElement>) {
    event.preventDefault();
  }
  // computed
  const filteredBookmarks = matchSorter(props.bookmarks, filter, {
    keys: ["title"],
    threshold: matchSorter.rankings.MATCHES,
  });
  // render
  return (
    <section className="space-y-6 mb-12">
      <Header>
        <Container>
          <Navigation
            current="bookmarks"
            title="Bookmarks"
            description="A collection of links I have found interesting and worth saving them for the future."
            path="/bookmarks"
          />
        </Container>
      </Header>

      <Container>
        <section className="mx-auto relative rounded-lg">
          <header id="search">
            <h2 className="font-semibold text-2xl">Search Bookmarks</h2>
          </header>

          <form
            role="search"
            onSubmit={handleSubmit}
            className="flex flex-col items-start space-y-2"
          >
            <label htmlFor="ama" className="text-gray-600 text-lg">
              Search a bookmark by title.
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
              <Spacer />

              <p
                className="text-xs text-gray-500 flex-shrink-0"
                style={{ lineHeight: "32px" }}
              >
                {filteredBookmarks.length} matching bookmarks
              </p>
            </footer>
          </form>
        </section>

        <section>
          <ul className="space-y-4 list-disc list-inside xl:list-outside">
            {filteredBookmarks.map((link) => (
              <BookmarkItem key={link.url} link={link} />
            ))}
          </ul>
        </section>
      </Container>
    </section>
  );
}
