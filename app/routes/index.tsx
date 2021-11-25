import type { Note } from "collected-notes";
import {
  HeadersFunction,
  Link,
  LoaderFunction,
  MetaFunction,
  useLoaderData,
} from "remix";
import { json } from "remix-utils";
import { Bookmark, getBookmarks } from "~/services/airtable.server";
import { CacheControl } from "~/services/cache-control";
import { cn, sitePath } from "~/services/cn.server";

type LoaderData = {
  notes: Pick<Note, "id" | "path" | "title">[];
  bookmarks: Bookmark[];
};

export let headers: HeadersFunction = () => {
  return { "Cache-Control": new CacheControl("swr").toString() };
};

export let meta: MetaFunction = () => {
  return {};
};

export let loader: LoaderFunction = async () => {
  let [notes, bookmarks] = await Promise.all([
    cn.latestNotes(sitePath, 1, "public_site"),
    getBookmarks(10),
  ]);
  return json<LoaderData>({
    notes: notes
      .slice(0, 10)
      .map((note) => ({ title: note.title, path: note.path, id: note.id })),
    bookmarks,
  });
};

export default function Index() {
  let { notes, bookmarks } = useLoaderData<LoaderData>();

  return (
    <div className="divide-y md:divide-y-0 md:divide-x divide-black md:flex">
      <section className="px-0 py-6 md:px-6 md:py-2 md:w-1/2 space-y-2">
        <header>
          <h2 className="font-semibold text-xl">Latest articles</h2>
          <p className="text-gray-900 text-sm">
            These are my latests articles.
          </p>
        </header>

        <main>
          <ul className="space-y-2">
            {notes.map((note) => (
              <li key={note.id} className="list-disc list-inside">
                <Link to={`/articles/${note.path}`}>{note.title}</Link>
              </li>
            ))}
          </ul>
        </main>

        <footer className="text-gray-900 text-xs">
          Want to see them all?{" "}
          <Link to="/articles" className="underline">
            Check full article list
          </Link>
        </footer>
      </section>

      <section className="px-0 py-6 md:px-6 md:py-2 md:w-1/2 space-y-2">
        <header>
          <h2 className="font-semibold text-xl">Recent bookmarks</h2>
          <p className="text-gray-900 text-sm">
            The latests links I have bookmarked.
          </p>
        </header>

        <main>
          <ul className="space-y-2">
            {bookmarks.map((bookmark) => (
              <li key={bookmark.url} className="list-disc list-inside">
                <a href={bookmark.url} rel="nofollow noreferer">
                  {bookmark.title}
                </a>
              </li>
            ))}
          </ul>
        </main>
      </section>
    </div>
  );
}
