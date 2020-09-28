import * as React from "react";
import Link from "next/link";
import { ReducedMeta } from "types";

type TagClickHandler = (tag: string) => void;

type TagProps = {
  onClick: TagClickHandler;
  label: string;
};

type ArticleItemProps = {
  article: ReducedMeta;
  onTagClick?: TagClickHandler;
};

function Tag({ onClick, label }: TagProps) {
  if (onClick) {
    return (
      <button
        onClick={() => onClick(label)}
        className="text-xs bg-blue-50 text-blue-900 px-2 leading-relaxed inline-block"
      >
        {label}
      </button>
    );
  }

  return (
    <span className="text-xs bg-blue-50 text-blue-900 px-2 leading-relaxed inline-block">
      {label}
    </span>
  );
}

export function ArticleItem({ article, onTagClick }: ArticleItemProps) {
  return (
    <article className="py-6 px-4">
      <Link href={article.slug}>
        <a className="font-semibold underline hover:no-underline text-blue-600 visited:text-gray-600 space-y-2">
          <header>
            <h3 className="text-xl">{article.title}</h3>
          </header>

          {/* {article.description ? (
        <p className="border-l-4 border-blue-500 pl-2 py-1 leading-normal text-md -ml-2 text-md">
          {article.description}
        </p>
      ) : null} */}

          {article.tags ? (
            <footer className="space-x-1">
              {article.tags
                .split(/\,\s?/)
                .map((tag) => tag.toLowerCase())
                .sort((a, b) => a.localeCompare(b))
                .map((tag) => (
                  <Tag onClick={onTagClick} label={tag} key={tag} />
                ))}
            </footer>
          ) : null}
        </a>
      </Link>
    </article>
  );
}
