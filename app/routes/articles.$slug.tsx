import type { HTML } from "collected-notes";
import type { HeadersFunction, LoaderFunction, MetaFunction } from "remix";
import { useRouteData } from "remix";
import { json } from "remix-utils";
import { CacheControl } from "../cache-control";
import { cn, sitePath } from "../cn.server";

interface RouteData {
  body: HTML;
  title: string;
}

export let headers: HeadersFunction = () => {
  return { "Cache-Control": new CacheControl("swr").toString() };
};

export let meta: MetaFunction = ({ data }) => {
  let { title } = data as RouteData;
  return {
    title: `${title} - Sergio Xalambrí`,
  };
};

export let loader: LoaderFunction = async ({ params }) => {
  let { body, note } = await cn.body(sitePath, params.slug);

  return json<RouteData>({ body, title: note.title });
};

export default function Index() {
  let { body } = useRouteData<RouteData>();

  return (
    <section className="space-y-4">
      <article
        dangerouslySetInnerHTML={{ __html: body }}
        className="prose dark:prose-dark sm:prose-lg mx-auto prose-blue"
      />
    </section>
  );
}
