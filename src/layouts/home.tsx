import * as React from "react";
import { GetStaticPropsResult } from "next";
import Link from "next/link";
import Head from "next/head";
import { Navigation } from "components/navigation";
import { Memoji, MemojiName, memojis } from "components/memoji";
import { Spacer } from "components/spacer";
import { Container } from "components/container";
import { Header } from "components/header";
import { DesktopOnly } from "components/media-query";
import { AMAForm } from "components/ama-form";
import { HomePageProps } from "types";

function ArticleItem({
  title,
  url,
  path,
}: {
  title: string;
  url: string;
  path?: string;
}) {
  if (url.startsWith("http")) {
    return (
      <article>
        <a
          href={url}
          className="text-white underline font-medium hover:no-underline visited:text-gray-500"
          rel="noopener noreferrer"
        >
          <h3 className="text-sm">{title}</h3>
        </a>
      </article>
    );
  }

  return (
    <article>
      <Link as={url} href={path}>
        <a className="text-white underline font-medium hover:no-underline visited:text-gray-500">
          <h3 className="text-sm">{title}</h3>
        </a>
      </Link>
    </article>
  );
}

export function HomeLayout({ bookmarks, notes }: HomePageProps) {
  const [memoji, setMemoji] = React.useState<MemojiName>("happy");

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
          <Navigation current="home" memoji={memoji} />

          <aside className="flex items-start mb-4">
            <div className="mt-4">
              <p className="leading-7">
                Hi there! I'm Sergio Xalambrí.
                <br />
                I'm a Software Engineer, specialized in Frontend.
                <br />I currently work at{" "}
                <a
                  href="https://able.co"
                  className="text-orange-400 underline hover:text-orange-500"
                >
                  Able
                </a>
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
              {notes.map((note) => (
                <ArticleItem
                  key={note.id}
                  title={note.meta.title}
                  url={note.meta.slug}
                  path="/articles/[...slug]"
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
              {bookmarks.map((bookmark) => (
                <ArticleItem
                  key={bookmark.url}
                  title={bookmark.title}
                  url={bookmark.url}
                />
              ))}
            </section>
          </section>
        </div>
      </Container>
    </>
  );
}
