import * as React from "react";
import Link from "next/link";
import { Navigation } from "components/navigation";
import { Container } from "components/container";
import { AMAForm } from "components/ama-form";
import { HomePageProps } from "types";
import { Card } from "components/card";

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
          className="text-blue-600 underline font-medium hover:no-underline visited:text-gray-600"
          rel="noopener noreferrer"
        >
          <h3 className="text-md">{title}</h3>
        </a>
      </article>
    );
  }

  return (
    <article>
      <Link as={url} href={path}>
        <a className="text-blue-600 underline font-medium hover:no-underline visited:text-gray-600">
          <h3 className="text-md">{title}</h3>
        </a>
      </Link>
    </article>
  );
}

export function HomeLayout({ bookmarks, notes }: HomePageProps) {
  return (
    <section className="space-y-12 mb-12">
      <header>
        <Container>
          <Navigation current="home" />
          <h1 className="text-7xl sm:text-8xl leading-none font-extrabold text-black md:text-center my-16">
            Sergio Xalambrí
          </h1>
          <div className="lg:px-4">
            <AMAForm />
          </div>
        </Container>
      </header>

      <Container>
        <div className="sm:divide-y md:divide-y-0 md:divide-x divide-gray-200 md:flex">
          <article className="px-0 py-6 md:px-6 md:py-2 md:w-1/2 space-y-2">
            <header id="articles">
              <h2 className="font-semibold text-xl">Latest Articles</h2>
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
          </article>

          <article className="px-0 py-6 md:px-6 md:py-2 md:w-1/2 space-y-2">
            <header id="bookmarks">
              <h2 className="font-semibold text-xl">Recent Bookmarks</h2>
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
          </article>
        </div>
      </Container>
    </section>
  );
}
