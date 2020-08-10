import * as React from "react";
import { Navigation } from "components/navigation";
import { Memoji, MemojiName, memojis } from "components/memoji";
import Link from "next/link";
import Head from "next/head";
import { Spacer } from "components/spacer";
import { getBookmarks } from "utils/get-bookmarks";
import { Container } from "components/container";
import { Header } from "components/header";
import { DesktopOnly } from "components/media-query";
import { AMAForm } from "components/ama-form";
import { getListOfArticles, Article } from "utils/get-list-of-articles";

type Props = {
  links: Array<{ title: string; url: string }>;
  articles: Article[];
};

const noop = () => {};

function Hoverable({ children, whileHover }) {
  const rollback = React.useRef<React.MouseEventHandler>(noop);
  function startHover(event) {
    rollback.current = whileHover(event);
  }
  function endHover(event) {
    if (typeof rollback.current === "function") rollback.current(event);
  }
  return (
    <span
      onMouseEnter={startHover}
      onMouseLeave={endHover}
      className="underline"
      style={{ textDecorationStyle: "wavy", textDecorationColor: "#D53F8C" }}
    >
      {children}
    </span>
  );
}

function ArticleItem({ title, url }: { title: string; url: string }) {
  if (url.startsWith("http")) {
    return (
      <article className="">
        <a href={url} className="text-white underline font-medium hover:no-underline visited:text-gray-500">
          <h3 className="text-sm">{title}</h3>
        </a>
      </article>
    );
  }

  return (
    <article className="">
      <Link href={url}>
        <a className="text-white underline font-medium hover:no-underline visited:text-gray-500">
          <h3 className="text-sm">{title}</h3>
        </a>
      </Link>
    </article>
  );
}

export async function getStaticProps(): Promise<{ props: Props }> {
  const [links, articles] = await Promise.all([
    getBookmarks(),
    getListOfArticles(),
  ]);
  return {
    props: {
      links: links.slice(0, 10),
      articles: articles
        .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
        .slice(0, 10),
    },
  };
}

export default function Home({ links, articles }: Props) {
  const [memoji, setMemoji] = React.useState<MemojiName>("happy");

  const workHover = React.useCallback(
    function workHover() {
      setMemoji("working");
      return () => setMemoji(memoji);
    },
    [memoji]
  );

  return (
    <>
      <Head>
        {Object.keys(memojis).map((name) => (
          <link
            key={name}
            rel="preload"
            href={`/static/avatar/${name}.png`}
            as="image"
          />
        ))}
      </Head>

      <Header>
        <Container>
          <Navigation current="home" />

          <aside className="flex items-start mb-4">
            <div className="mt-4">
              <p className="leading-7">
                Hi there! I'm Sergio Xalambrí.
                <br />
                I'm a Software Engineer, specialized in Frontend.
                <br />
                <Hoverable whileHover={workHover}>
                  I currently work at <a href="https://able.co" className="text-orange-500">Able</a>
                </Hoverable>
                , building products to help other people.
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
        <section className="space-y-2 mb-4 -mt-6 md:-mt-12 bg-black p-4 rounded-lg border-gray-900 border-4">
          <AMAForm setMemoji={setMemoji} />
        </section>

        <div className="sm:grid sm:grid-cols-2 md:grid-cols-5 gap-4 my-4 space-y-8 sm:space-y-0 mb-12">
          <section className="space-y-2 md:col-span-3">
            <header id="articles">
              <h2 className="font-semibold text-lg">Latest Articles</h2>
              <p className="text-gray-600 text-sm">
                These are my latests articles.
              </p>
            </header>

            <section className="space-y-2">
              {articles.map((link) => (
                <ArticleItem
                  key={link.slug}
                  title={link.title}
                  url={link.slug}
                />
              ))}
            </section>

            <p className="text-gray-700 text-xs">
              Want to see them all?{" "}
              <Link href="/articles">
                <a className="underline">Check full article list</a>
              </Link>
            </p>
          </section>

          <section className="space-y-2 md:col-span-2">
            <header id="bookmarks">
              <h2 className="font-semibold text-lg">Recent Bookmarks</h2>
              <p className="text-gray-600 text-sm">
                The latests links I have bookmarked
              </p>
            </header>

            <section className="space-y-2">
              {links.map((link) => (
                <ArticleItem key={link.url} title={link.title} url={link.url} />
              ))}
            </section>
          </section>
        </div>
      </Container>
    </>
  );
}
