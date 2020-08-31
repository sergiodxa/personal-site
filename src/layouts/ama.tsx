import * as React from "react";
import Head from "next/head";
import { Navigation } from "components/navigation";
import { MemojiName, memojis } from "components/memoji";
import { Container } from "components/container";
import { Header } from "components/header";
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
          <Navigation
            current="Ask Me!"
            memoji={memoji}
            title="Ask me Anything!"
            description="Ask me any question, I will wrote an article about it."
            path="/ama"
          />
        </Container>
      </Header>

      <Container>
        <section className="space-y-2 mb-4 -mt-8 bg-black p-4 rounded-lg border-gray-900 border-4">
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
