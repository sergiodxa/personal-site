import { json, LoaderFunction } from "@remix-run/node";
import { Link } from "react-router-dom";
import { Container } from "../components/container";
import { Navigation } from "../components/navigation";
import { HomePageProps, Meta } from "../types";
import { collectedNotes } from "collected-notes";
import { getBookmarks } from "../utils/get-bookmarks";
import matter from "gray-matter";
import { useRouteData } from "@remix-run/react";

export const loader: LoaderFunction = async () => {
  const cn = collectedNotes(process.env.CN_EMAIL as string, process.env.CN_TOKEN as string);

  const [bookmarks, { site, notes }] = await Promise.all([
    getBookmarks(10),
    // @ts-expect-error
    cn.site(process.env.CN_SITE_PATH, 1, "public_site"),
  ]);

  return json({
    site,
    bookmarks,
    notes: notes
      .map((note) => [note, matter(note.body).data as Meta] as const)
      .map(([note, meta]) => ({
        ...note,
        meta: {
          title: note.title,
          description: meta.description ?? "",
          date: new Date(meta.date).toJSON() ?? note.created_at,
          slug: `/articles/${note.path}`,
          tags: meta.tags ?? "",
        },
      }))
      .sort(
        (a, b) =>
          new Date(new Date(b.meta.date)).getTime() -
          new Date(new Date(a.meta.date)).getTime()
      )
      .slice(0, 10),
  });
};

export default function View() {
  const { bookmarks, notes } = useRouteData<HomePageProps>();

  return (
    <section className="mb-12 space-y-8 md:space-y-32">
      <Container>
        <header className="space-y-8 md:space-y-32">
          <Navigation current="home" />
          <h1 className="text-4xl sm:text-7xl md:text-8xl leading-none font-extrabold text-center">
            Sergio Xalambrí
          </h1>
        </header>
      </Container>

      <Container>
        <div className="divide-y md:divide-y-0 md:divide-x divide-gray-200 dark:divide-gray-800 md:flex">
          <article className="px-0 py-6 md:px-6 md:py-2 md:w-1/2 space-y-2">
            <header id="articles">
              <h2 className="font-semibold text-xl">Latest Articles</h2>
              <p className="text-gray-600 dark:text-gray-400 text-sm">
                These are my latests articles.
              </p>
            </header>

            <section className="space-y-2">
              {notes.map((note) => (
                <ArticleItem
                  key={note.id}
                  title={note.meta.title}
                  url={note.meta.slug}
                />
              ))}
            </section>

            <p className="text-gray-700 dark:text-gray-300 text-xs">
              Want to see them all?{" "}
              <Link to="/articles">
                <a className="underline">Check full article list</a>
              </Link>
            </p>
          </article>

          <article className="px-0 py-6 md:px-6 md:py-2 md:w-1/2 space-y-2">
            <header id="bookmarks">
              <h2 className="font-semibold text-xl">Recent Bookmarks</h2>
              <p className="text-gray-600 dark:text-gray-400 text-sm">
                The latests links I have bookmarked
              </p>
            </header>

            <section className="space-y-2">
              {bookmarks.map((bookmark) => (
                <ArticleItem
                  key={bookmark.url}
                  title={bookmark.title}
                  url={bookmark.url}
                />
              ))}
            </section>
          </article>
        </div>
      </Container>
    </section>
  );
}

function ArticleItem({ title, url }: { title: string; url: string }) {
  if (url.startsWith("http")) {
    return (
      <article>
        <a
          href={url}
          className="underline font-medium hover:no-underline text-blue-600 visited:text-indigo-600 dark:text-blue-500 dark:visited:text-indigo-400"
          rel="noopener noreferrer"
        >
          <h3 className="text-md">{title}</h3>
        </a>
      </article>
    );
  }

  return (
    <article>
      <Link
        to={url}
        className="underline font-medium hover:no-underline text-blue-600 visited:text-indigo-600 dark:text-blue-500 dark:visited:text-indigo-400"
      >
        <h3 className="text-md">{title}</h3>
      </Link>
    </article>
  );
}