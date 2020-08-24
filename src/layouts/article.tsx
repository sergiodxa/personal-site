import * as React from "react";
import { useRouter } from "next/router";
import { Header } from "components/header";
import { Container } from "components/container";
import { Navigation } from "components/navigation";
import { parse, format } from "url";
import { ArticlePageProps } from "types";

export function ArticleLayout({ body, links }: ArticlePageProps) {
  const { isFallback } = useRouter();
  return (
    <>
      <Header>
        <Container>
          <Navigation current="articles" title="Articles" />
        </Container>
      </Header>

      <Container>
        <section className="space-y-10 -mt-8 bg-white p-4 rounded-lg border-black border-4 relative mb-6">
          {isFallback ? (
            <ContentSkeleton />
          ) : (
            <>
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
                        <li key={link.id} className="mt-1 ml-4">
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
            </>
          )}
        </section>
      </Container>

      {!isFallback ? (
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
      ) : null}
    </>
  );
}

function ContentSkeleton() {
  return (
    <article className="space-y-4 animate-pulse">
      <div className="h-4 bg-gray-400 rounded w-2/3" />
      <div className="h-4 bg-gray-400 rounded w-4/5" />
      <div className="h-4 bg-gray-400 rounded w-2/3" />
      <div className="h-4 bg-gray-400 rounded" />
      <div className="h-4 bg-gray-400 rounded w-3/5" />
      <div className="h-4 bg-gray-400 rounded w-1/3" />
      <div className="h-4 bg-gray-400 rounded w-4/5" />
      <div className="h-4 bg-gray-400 rounded" />
      <div className="h-4 bg-gray-400 rounded w-3/5" />
    </article>
  );
}
