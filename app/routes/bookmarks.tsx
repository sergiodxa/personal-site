import {
  HeadersFunction,
  LoaderFunction,
  MetaFunction,
  useRouteData,
} from "remix";
import { json } from "remix-utils";
import { Bookmark, getBookmarks } from "~/airtable.server";
import { CacheControl } from "~/cache-control";

interface RouteData {
  bookmarks: Bookmark[];
}

export let headers: HeadersFunction = () => {
  return { "Cache-Control": new CacheControl("swr").toString() };
};

export let meta: MetaFunction = () => {
  return { title: "Bookmarks of Sergio Xalambrí" };
};

export let loader: LoaderFunction = async () => {
  let bookmarks = await getBookmarks();
  return json<RouteData>({ bookmarks });
};

export default function Index() {
  let { bookmarks } = useRouteData<RouteData>();

  return (
    <section className="space-y-2">
      <header>
        <h2 className="font-bold text-3xl">Bookmarks</h2>
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
  );
}
