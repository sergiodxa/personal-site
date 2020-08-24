import * as React from "react";
import Link from "next/link";
import { ReducedMeta } from "types";

export function ArticleItem({
  article,
  onTagClick,
}: {
  article: ReducedMeta;
  onTagClick?(tag: string): void;
}) {
  return (
    <article>
      <header>
        <Link href={article.slug}>
          <a className="font-semibold underline hover:no-underline text-white visited:text-gray-500">
            <h3 className="text-lg">{article.title}</h3>
          </a>
        </Link>
      </header>

      {article.description ? (
        <p className="border-l-4 border-orange-500 pl-2 py-1 leading-normal text-sm -ml-3">
          {article.description}
        </p>
      ) : null}

      {article.tags ? (
        <footer className="space-x-2">
          {article.tags
            .split(/\,\s?/)
            .map((tag) => tag.toLowerCase())
            .sort((a, b) => a.localeCompare(b))
            .map((tag) =>
              onTagClick ? (
                <button
                  key={tag}
                  onClick={() => onTagClick(tag)}
                  className="text-xs bg-gray-900 text-blue-400 px-2 leading-relaxed inline-block"
                >
                  {tag}
                </button>
              ) : (
                <span
                  key={tag}
                  className="text-xs bg-gray-900 text-blue-400 px-2 leading-relaxed inline-block"
                >
                  {tag}
                </span>
              )
            )}
        </footer>
      ) : null}
    </article>
  );
}
