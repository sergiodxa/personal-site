import { Link } from "react-router-dom";
import { ReducedMeta } from "../types";

type TagClickHandler = (tag: string) => void;

type TagProps = {
  onClick: TagClickHandler;
  label: string;
};

type ArticleItemProps = {
  article: ReducedMeta;
  onTagClick?: TagClickHandler;
};

function noop() {}

function Tag({ onClick, label }: TagProps) {
  if (onClick) {
    return (
      <button
        onClick={() => onClick(label)}
        className="text-xs bg-blue-50 dark:bg-blue-900 text-blue-900 dark:text-blue-100 px-2 leading-relaxed inline-block select-none"
      >
        {label}
      </button>
    );
  }

  return (
    <span className="text-xs bg-blue-50 dark:bg-blue-900 text-blue-900 dark:text-blue-100 px-2 leading-relaxed inline-block select-none">
      {label}
    </span>
  );
}

export function ArticleItem({ article, onTagClick }: ArticleItemProps) {
  return (
    <article className="py-6 px-4 space-y-2">
      <header>
        <h3 className="text-xl">
          <Link
            to={article.slug}
            className="font-semibold underline hover:no-underline text-blue-600 dark:text-blue-500 visited:text-indigo-600 dark:visited:text-indigo-400 inline"
          >
            {article.title}
          </Link>
        </h3>
      </header>

      {article.description ? (
        <p className="border-l-4 border-gray-900 dark:border-gray-100 pl-2 py-1 leading-normal text-md -ml-2 text-md">
          {article.description}
        </p>
      ) : null}

      {article.tags ? (
        <footer className="space-x-1">
          {article.tags
            .split(/\,\s?/)
            .map((tag) => tag.toLowerCase())
            .sort((a, b) => a.localeCompare(b))
            .map((tag) => (
              <Tag onClick={onTagClick ?? noop} label={tag} key={tag} />
            ))}
        </footer>
      ) : null}
    </article>
  );
}
