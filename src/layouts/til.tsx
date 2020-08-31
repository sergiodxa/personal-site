import * as React from "react";
import Head from "next/head";
import { Navigation } from "components/navigation";
import { MemojiName, memojis } from "components/memoji";
import { Container } from "components/container";
import { Header } from "components/header";
import { TILPageProps } from "types";
import { ArticleItem } from "components/article-item";

export function TILLayout(props: TILPageProps) {
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
            current="TIL"
            memoji={memoji}
            title="Today I Learned"
            description="I share small notes on things I learn"
            path="/til"
          />
        </Container>
      </Header>

      <Container>
        <section className="space-y-4 -mt-8 bg-black p-8 rounded-lg border-gray-900 border-4 relative">
          {props.notes.map((article) => (
            <ArticleItem key={article.id} article={article.meta} />
          ))}
        </section>
      </Container>
    </>
  );
}
