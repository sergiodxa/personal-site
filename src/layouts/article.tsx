import * as React from "react";
import { useRouter } from "next/router";
import { Header } from "components/header";
import { Container } from "components/container";
import { Navigation } from "components/navigation";
import { Spacer } from "components/spacer";
import { DesktopOnly } from "components/media-query";
import { Memoji } from "components/memoji";
import { parse } from "url";
import { ArticlePageProps } from "types";

export function ArticleLayout({ meta, body, links }: ArticlePageProps) {
  const { isFallback } = useRouter();
  return (
    <>
      <Header>
        <Container>
          <Navigation current="articles" title="Articles" />

          <section className="flex items-start mb-4 space-x-4">
            {isFallback ? (
              <TitleSkeleton />
            ) : meta?.description ? (
              <p className="mt-6 text-xl pl-2 py-1">{meta.description}</p>
            ) : null}

            <Spacer />

            <figure className="flex-shrink-0">
              <DesktopOnly>
                <Memoji name="happy" width={210} />
              </DesktopOnly>
            </figure>
          </section>
        </Container>
      </Header>

      <Container>
        <section className="space-y-10 -mt-6 md:-mt-12 bg-white p-4 rounded-lg border-black border-4 relative mb-6">
          {isFallback ? (
            <ContentSkeleton />
          ) : (
            <>
              <article
                className="prose prose-sm md:prose lg:prose-lg"
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
                    {links.map((link) => (
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
                          {parse(link.url).pathname}
                        </span>
                      </li>
                    ))}
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

function TitleSkeleton() {
  return (
    <div
      className="animate-pulse h-5 bg-gray-400 rounded w-3/5"
      style={{
        marginTop: 32,
      }}
    />
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
