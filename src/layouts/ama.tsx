import * as React from "react";
import Head from "next/head";
import { Navigation } from "components/navigation";
import { Memoji, MemojiName, memojis } from "components/memoji";
import { Spacer } from "components/spacer";
import { Container } from "components/container";
import { Header } from "components/header";
import { DesktopOnly } from "components/media-query";
import { AMAForm } from "components/ama-form";
import { AMAPageProps } from "types";
import { ArticleItem } from "components/article-item";

export function AMALayout(props: AMAPageProps) {
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
          <Navigation current="Ask Me!" memoji={memoji} />

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

        <section className="space-y-4 mb-12 px-4 border-l-4 border-r-4 border-black">
          {props.notes.map((article) => (
            <ArticleItem key={article.id} article={article.meta} />
          ))}
        </section>
      </Container>
    </>
  );
}
