import * as React from "react";
import { Navigation } from "components/navigation";
import { Container } from "components/container";
import { ArticleListPageProps } from "types";
import { AMAForm } from "components/ama-form";
import { ArticleItem } from "components/article-item";

export function ArticlesListLayout(props: ArticleListPageProps) {
  return (
    <section className="space-y-6 mb-12">
      <header>
        <Container>
          <Navigation
            current="articles"
            title="Articles"
            description="All the articles I have wrote in my career"
            path="/articles"
          />
        </Container>
      </header>

      <Container>
        <div className="mx-auto relative rounded-lg">
          <AMAForm />
        </div>
      </Container>

      <Container>
        <section className="divide-y divide-gray-200">
          {props.notes.map(function mapToArticleItem(article) {
            return <ArticleItem key={article.id} article={article.meta} />;
          })}
        </section>
      </Container>
    </section>
  );
}
