import * as React from "react";
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

type Props = {
  slug: string;
  meta: Article;
  content: string;
};

export async function getStaticProps({ params }): Promise<{ props: Props }> {
  const { slug } = params;
  const [meta, content] = await getArticle(slug.join("/"));
  return {
    props: {
      slug: slug.join("/"),
      meta,
      // content,
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
  return { paths, fallback: false };
}

export default function ArticlePage({ meta, content }: Props) {
  console.log(content);

  return (
    <>
      <Header>
        <Container>
          <Navigation current="articles" title="Articles" />

          <section className="flex items-start mb-4 space-x-4">
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
              <p className="leading-7 border-l-4 border-orange-500 pl-2 py-1">
                {meta.description}
              </p>
            </div>

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
        <section className="space-y-2 -mt-6 md:-mt-12 bg-white p-4 rounded-lg border-black border-4 relative mb-12">
          <article
            className="prose prose-sm md:prose lg:prose-lg"
            dangerouslySetInnerHTML={{ __html: content }}
          />
        </section>
      </Container>
    </>
  );
}
