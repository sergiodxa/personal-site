import type { Note } from "collected-notes";
import {
  Form,
  HeadersFunction,
  Link,
  LoaderFunction,
  MetaFunction,
  useLoaderData,
  useTransition,
} from "remix";
import { json } from "remix-utils";
import { CacheControl } from "~/services/cache-control";
import { cn, sitePath } from "~/services/cn.server";

type LoaderData = {
  term: string;
  page: number;
  notes: Pick<Note, "id" | "path" | "title">[];
};

export let headers: HeadersFunction = () => {
  return { "Cache-Control": new CacheControl("swr").toString() };
};

export let meta: MetaFunction = () => {
  return { title: "Articles of Sergio Xalambrí" };
};

function getNotes(page = 1, term?: string) {
  if (term) return cn.search(sitePath, term, page, "public_site");
  return cn.latestNotes(sitePath, page, "public_site");
}

export let loader: LoaderFunction = async ({ request }) => {
  let url = new URL(request.url);
  let term = url.searchParams.get("q") ?? "";
  let page = Number(url.searchParams.get("page") ?? 1);
  let notes = await getNotes(page, term);
  return json<LoaderData>({
    term,
    page,
    notes: notes.map((note) => ({
      title: note.title,
      path: note.path,
      id: note.id,
    })),
  });
};

export default function Screen() {
  let { notes, page, term } = useLoaderData<LoaderData>();
  let { submission } = useTransition();

  let count = notes.length;

  if (count === 0) {
    return (
      <main className="space-y-4">
        <h2 className="text-3xl font-bold">404 Not Found</h2>
        <p>
          The requested URL /articles?page={page} was not found on this server.
        </p>
      </main>
    );
  }

  return (
    <section className="space-y-2">
      <header>
        <h2 className="font-bold text-3xl">Articles</h2>
        {term ? (
          <p className="text-gray-900 text-xl">
            Showing {count} articles for the query{" "}
            <em className="quote">{term}</em>.
          </p>
        ) : (
          <p className="text-gray-900 text-xl">These are my articles.</p>
        )}
      </header>

      <main className="space-y-4">
        <Form method="get" role="search" className="p-4">
          <label htmlFor="q" className="text-lg font-semibold pl-4 block">
            Search
          </label>
          <div className="space-x-4 flex items-center">
            <input
              id="q"
              type="search"
              name="q"
              defaultValue={term}
              className="rounded-full flex-grow py-2 px-4"
              placeholder="Remix, SWR, Next, Rails..."
            />
            <button
              type="submit"
              className="bg-gray-800 text-white border border-gray-900 px-4 py-2 rounded-full"
            >
              {submission ? "Searching..." : "Search"}
            </button>
          </div>
        </Form>

        <ul className="space-y-2">
          {notes.map((note) => (
            <li key={note.id} className="list-disc list-inside">
              <Link to={`/articles/${note.path}`}>{note.title}</Link>
            </li>
          ))}
        </ul>
      </main>

      <footer className="flex justify-evenly w-full">
        {page > 1 && (
          <Link to={`/articles?page=${page - 1}`}>Previous page</Link>
        )}
        {count === 40 && (
          <Link to={`/articles?page=${page + 1}`}>Next page</Link>
        )}
      </footer>
    </section>
  );
}
