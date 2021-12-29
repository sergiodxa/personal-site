import type { HTML } from "collected-notes";
import {
  HeadersFunction,
  json,
  LinksFunction,
  LoaderFunction,
  MetaFunction,
  useLoaderData,
} from "remix";
import { CacheControl } from "~/services/cache-control";
import { cn, sitePath } from "~/services/cn.server";
import highlightStyles from "~/styles/highlight.css";

type LoaderData = {
  body: HTML;
  title: string;
};

export let headers: HeadersFunction = () => {
  return { "Cache-Control": new CacheControl("swr").toString() };
};

export let meta: MetaFunction = ({ data }) => {
  let { title } = data as LoaderData;
  return {
    title: `${title} - Sergio Xalambrí`,
  };
};
export let links: LinksFunction = () => {
  return [{ rel: "stylesheet", href: highlightStyles }];
};

export let loader: LoaderFunction = async ({ request }) => {
  let { pathname } = new URL(request.url);
  let slug = pathname.slice(
    pathname.indexOf("/articles/") + "/articles/".length
  );
  let { body, note } = await cn.body(sitePath, slug);

  return json<LoaderData>(
    { body, title: note.title },
    { headers: { "Cache-Control": new CacheControl("swr").toString() } }
  );
};

export default function Index() {
  let { body } = useLoaderData<LoaderData>();

  return (
    <section className="space-y-4">
      <article
        dangerouslySetInnerHTML={{ __html: body }}
        className="prose dark:prose-dark sm:prose-lg mx-auto prose-blue"
      />
    </section>
  );
}
