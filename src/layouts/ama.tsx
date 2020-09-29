import * as React from "react";
import { Navigation } from "components/navigation";
import { Container } from "components/container";
import { Header } from "components/header";
import { AMAForm } from "components/ama-form";
import { AMAPageProps } from "types";
import { ArticleItem } from "components/article-item";

export function AMALayout(props: AMAPageProps) {
  return (
    <section className="space-y-6 mb-12">
      <Header>
        <Container>
          <Navigation
            current="Ask Me!"
            title="Ask me Anything!"
            description="Ask me any question, I will wrote an article about it."
            path="/ama"
          />
        </Container>
      </Header>

      <Container>
        <section className="mx-auto relative rounded-lg">
          <AMAForm />
        </section>
      </Container>

      <Container>
        <section className="divide-y divide-gray-200">
          {props.notes.map((article) => (
            <ArticleItem key={article.id} article={article.meta} />
          ))}
        </section>
      </Container>
    </section>
  );
}
