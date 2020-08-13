import * as React from "react";
import Link from "next/link";
import { getBookmarks } from "utils/get-bookmarks";
import { Header } from "components/header";
import { Container } from "components/container";
import { Navigation } from "components/navigation";
import { Spacer } from "components/spacer";
import { DesktopOnly } from "components/media-query";
import { Memoji } from "components/memoji";
import matchSorter from "match-sorter";
import Router from "next/router";

type Link = {
  url: string;
  title: string;
};

type Props = {
  links: Link[];
};

export async function getStaticProps(): Promise<{ props: Props }> {
  const links = await getBookmarks();
  return { props: { links } };
}

function LinkItem({ link }: { link: Link }) {
  return (
    <article className="space-y-2">
      <a
        href={link.url}
        rel="noopener noreferrer"
        className="font-semibold underline hover:no-underline text-white visited:text-gray-500"
      >
        <h3 className="text-lg">{link.title}</h3>
      </a>
    </article>
  );
}

export default function Bookmarks(props: Props) {
  // states
  const [filter, setFilter] = React.useState("");
  // callbacks
  function handleSubmit(event: React.FocusEvent<HTMLFormElement>) {
    event.preventDefault();
  }
  // computed
  const filteredLinks = matchSorter(props.links, filter, {
    keys: ["title"],
    threshold: matchSorter.rankings.MATCHES,
  });
  // effects
  React.useEffect(() => {
    if (filter !== "") {
      Router.replace("/bookmarks", `/bookmarks?search=${filter}`);
    } else {
      Router.replace("/bookmarks", `/bookmarks`);
    }
  }, [filter]);
  // render
  return (
    <>
      <Header>
        <Container>
          <Navigation current="bookmarks" title="Bookmarks" />

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
                Bookmarks
              </h2>
              <p className="leading-7">
                A collection of links I have found interesting and worth saving
                them for the future.
              </p>
            </div>

            <Spacer />

            <figure className="flex-shrink-0">
              <DesktopOnly>
                <Memoji name="working" width={210} />
              </DesktopOnly>
            </figure>
          </aside>
        </Container>
      </Header>

      <Container>
        <section className="space-y-2 mb-4 -mt-6 md:-mt-12 bg-black p-4 rounded-lg border-gray-900 border-4 relative">
          <header id="search">
            <h2 className="font-semibold">Search Bookmarks</h2>
          </header>

          <form
            role="search"
            onSubmit={handleSubmit}
            className="flex flex-col items-start space-y-2"
          >
            <label htmlFor="ama" className="text-gray-600 text-sm">
              Search a bookmark by title.
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
              <Spacer />

              <p
                className="text-xs text-gray-500 flex-shrink-0"
                style={{ lineHeight: "32px" }}
              >
                {filteredLinks.length} matching articles
              </p>
            </footer>
          </form>
        </section>

        <section className="space-y-2 mb-12 px-4 border-l-4 border-r-4 border-black">
          {filteredLinks.map((link) => (
            <LinkItem key={link.url} link={link} />
          ))}
        </section>
      </Container>
    </>
  );
}
