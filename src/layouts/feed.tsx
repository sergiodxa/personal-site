import * as React from "react";
import Head from "next/head";
import { Header } from "components/header";
import { Container } from "components/container";
import { Navigation } from "components/navigation";
import { FeedPageProps } from "types";

export function FeedLayout({ feed, id }: FeedPageProps) {
  return (
    <section className="space-y-6 mb-12">
      <Head>
        <meta name="robots" content="noindex" />
      </Head>

      <Header>
        <Container>
          <Navigation
            current="reader"
            title={feed.title ?? "Reader Blog"}
            description={feed.description}
            path={`/reader/${id}`}
          />
        </Container>
      </Header>

      <Container>
        <div className="divide-y divide-gray-200 dark:divide-gray-800">
          {feed.items.map((item) => {
            return (
              <section
                key={item.guid}
                className="py-12 px-4 space-y-2 max-w-prose mx-auto prose dark:prose-dark sm:prose-lg"
              >
                <header>
                  <h1 className="text-4xl">{item.title}</h1>

                  <blockquote>
                    Read full article on <a href={item.link}>{item.link}</a>
                  </blockquote>
                </header>

                <article dangerouslySetInnerHTML={{ __html: item.content }} />
              </section>
            );
          })}
        </div>
      </Container>
    </section>
  );
}
