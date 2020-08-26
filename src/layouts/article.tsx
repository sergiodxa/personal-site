import * as React from "react";
import Head from "next/head";
import Link from "next/link";
import { Header } from "components/header";
import { Container } from "components/container";
import { Navigation } from "components/navigation";
import { parse, format } from "url";
import { ArticlePageProps } from "types";

function formatOGURL(title: string, description: string) {
  const eTitle = encodeURIComponent(title);
  const eDescription = encodeURIComponent(description);
  return `https://i.microlink.io/https%3A%2F%2Fcards.microlink.io%2F%3Fpreset%3Dcontentz%26title%3D$${eTitle}%26description%3D${eDescription}`;
}

export function ArticleLayout({ body, links, meta }: ArticlePageProps) {
  const isAMA = meta?.tags?.includes("ama");
  const isDraft = meta.tags?.includes("draft");
  return (
    <>
      <Head>
        <meta property="og:title" content={meta.title} />
        <meta property="og:description" content={meta.description} />
        <meta
          property="og:image"
          content={formatOGURL(meta.title, meta.description)}
        />
      </Head>

      <Header>
        <Container>
          <Navigation current="articles" title="Articles" />
        </Container>
      </Header>

      <Container>
        <section className="space-y-10 -mt-8 bg-white p-4 rounded-lg border-black border-4 relative mb-6">
          {isAMA || isDraft ? (
            <aside className="prose prose-sm md:prose">
              {isAMA ? (
                <blockquote>
                  Note: This is an answer to an Ask Me Anything request I
                  received, you can ask me anything going to{" "}
                  <Link href="/ama">
                    <a>sergiodxa.com/ama</a>
                  </Link>
                  .
                </blockquote>
              ) : null}

              {isDraft ? (
                <blockquote>
                  Warning: You are reading a draft article, sentences may be
                  incomplete and ideas may be still in the open, typos are
                  expected.
                  <br />
                  <a href="https://twitter.com/sergiodxa">
                    Follow me on Twitter
                  </a>{" "}
                  to know when it's ready.
                </blockquote>
              ) : null}
            </aside>
          ) : null}

          <article
            className="prose prose-sm md:prose"
            dangerouslySetInnerHTML={{
              __html: body,
            }}
          />

          {links?.length > 0 ? (
            <aside className="max-w-prose mx-auto border-t border-gray-500 py-6 mb-6">
              <p className="text-gray-900 font-bold leading-normal">
                Links on this note ↗
              </p>

              <ul>
                {links.map((link) => {
                  const url = parse(link.url);

                  return (
                    <li key={link.id} className="mt-1 ml-4 truncate">
                      <a
                        className="text-gray-900 font-semibold underline"
                        href={link.url}
                        title={link.title}
                        rel="noopener noreferrer"
                      >
                        {link.host}
                      </a>
                      <span className="text-gray-600">
                        {format({
                          pathname: url.pathname,
                          query: url.query,
                          hash: url.hash,
                        })}
                      </span>
                    </li>
                  );
                })}
              </ul>
            </aside>
          ) : null}
        </section>
      </Container>

      <Container>
        <footer className="mb-12">
          <p className="text-gray-500 text-sm text-right">
            Powered by{" "}
            <a
              href="https://collectednotes.com"
              className="underline"
              rel="noopener noreferrer"
            >
              Collected Notes
            </a>
          </p>
        </footer>
      </Container>
    </>
  );
}