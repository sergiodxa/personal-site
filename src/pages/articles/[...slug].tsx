import * as React from "react";
import { GetStaticPropsResult } from "next";
import { useRouter } from "next/router";
import { getArticle } from "utils/get-article";
import { Article } from "types/article";
import { getListOfArticles } from "utils/get-list-of-articles";
import { Header } from "components/header";
import { Container } from "components/container";
import { Navigation } from "components/navigation";
import { Spacer } from "components/spacer";
import { DesktopOnly } from "components/media-query";
import { Memoji } from "components/memoji";
import marked from "marked";
import { parse } from "url";

type Props = {
  slug: string;
  meta: Article;
  content: string;
};

export async function getStaticProps({
  params,
}): Promise<GetStaticPropsResult<Props>> {
  const { slug } = params;
  const [meta, content] = await getArticle(slug.join("/"));
  return {
    revalidate: 1,
    props: {
      slug: slug.join("/"),
      meta,
      content: marked(content, {
        breaks: true,
        headerIds: true,
        sanitize: false,
        silent: true,
      }),
    },
  };
}

export async function getStaticPaths() {
  const articles = await getListOfArticles();
  const paths = articles.map((article) => {
    return {
      params: { slug: article.slug.slice("/articles/".length).split("/") },
    };
  });
  return { paths, fallback: true };
}

export default function ArticlePage({ meta, content }: Props) {
  const { isFallback } = useRouter();
  return (
    <>
      <Header>
        <Container>
          <Navigation current="articles" title="Articles" />

          <section className="flex items-start mb-4 space-x-4">
            {isFallback ? (
              <TitleSkeleton />
            ) : (
              <div className="mt-4 space-y-2">
                <h1
                  className="text-xl leading-normal font-semibold"
                  style={{
                    background: "linear-gradient(45deg, #ED8936, #F6E05E)",
                    backgroundClip: "text",
                    WebkitBackgroundClip: "text",
                    WebkitTextFillColor: "transparent",
                  }}
                >
                  {meta.title}
                </h1>

                {meta?.description ? (
                  <p className="leading-7 border-l-4 border-orange-500 pl-2 py-1">
                    {meta.description}
                  </p>
                ) : null}
              </div>
            )}

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
        <section className="space-y-2 -mt-6 md:-mt-12 bg-white p-4 rounded-lg border-black border-4 relative mb-6">
          {isFallback ? (
            <ContentSkeleton />
          ) : (
            <>
              <article
                className="prose prose-sm md:prose lg:prose-lg"
                dangerouslySetInnerHTML={{
                  __html: content,
                }}
              />
              {meta.links?.length > 0 ? (
                <aside className="max-w-prose mx-auto px-10 border-t border-gray-500 mt-6 py-6 mb-6">
                  <p className="font-bold leading-normal">
                    Links on this note↗
                  </p>

                  <ul>
                    {meta.links?.map((link) => {
                      const isInternal = link.kind === "internal";
                      return (
                        <li
                          key={link.id}
                          className="mt-1 ml-8"
                          style={{
                            listStylePosition: "outside",
                            listStyleType: isInternal ? "square" : "none",
                          }}
                        >
                          <a
                            className="font-bold underline"
                            href={link.url}
                            title={link.title}
                          >
                            {link.host}
                          </a>
                          <span className="text-gray-600">
                            {parse(link.url).pathname}
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
            {meta.cn ? (
              <p className="text-gray-600 text-sm text-right">
                Powered by{" "}
                <a
                  href="https://collectednotes.com"
                  className="underline"
                  rel="noopener noreferrer"
                >
                  Collected Notes
                </a>
              </p>
            ) : null}
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
