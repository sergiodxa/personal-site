import * as React from "react";
import Head from "next/head";
import { Header } from "components/header";
import { Container } from "components/container";
import { Navigation } from "components/navigation";
import { FeedPageProps } from "types";

const { format } = new Intl.DateTimeFormat("en-US", {
  year: "numeric",
  month: "long",
  day: "numeric",
});

export function FeedLayout({ feed, url, name }: FeedPageProps) {
  return (
    <section className="space-y-6 mb-12">
      <Head>
        <meta name="robots" content="noindex" />
      </Head>

      <Header>
        <Container>
          <Navigation
            current="reader"
            title={name ?? feed.title ?? "Reader Blog"}
            description={feed.description}
          />
        </Container>
      </Header>

      <Container>
        <header className="prose dark:prose-dark sm:prose-lg mx-auto">
          <h1>{name ?? feed.title ?? "Reader Blog"}</h1>

          <blockquote>
            <a href={url} rel="nofollow noreferrer">
              Follow this blog
            </a>
          </blockquote>

          {feed.lastBuildDate ? (
            <blockquote>
              <time dateTime={feed.lastBuildDate}>
                Last updated on {format(new Date(feed.lastBuildDate))}
              </time>
            </blockquote>
          ) : null}
        </header>

        <div className="divide-y divide-gray-200 dark:divide-gray-800">
          {feed.items.map((item) => {
            return (
              <section
                key={item.guid}
                className="pb-6 px-4 space-y-2 max-w-prose mx-auto prose dark:prose-dark sm:prose-lg"
              >
                <header>
                  <h2
                    className="text-4xl"
                    dangerouslySetInnerHTML={{ __html: item.title }}
                  />
                </header>

                <article className="whitespace-pre-line line-clamp-3">
                  {item.contentSnippet ?? item.content ?? ""}
                </article>

                <footer>
                  <blockquote>
                    Read full article on{" "}
                    <a href={item.link} rel="nofollow noreferrer">
                      {item.link}
                    </a>
                  </blockquote>
                </footer>
              </section>
            );
          })}
        </div>
      </Container>
    </section>
  );
}
