import { LoaderFunction, MetaFunction, useLoaderData } from "remix";
import { json } from "remix-utils";

interface LoaderData {
  pathname: string;
}

export let meta: MetaFunction = () => {
  return { title: "Ain't nothing here" };
};

export let loader: LoaderFunction = async ({ request }) => {
  let { pathname } = new URL(request.url);
  return json<LoaderData>({ pathname });
};

export default function FourOhFour() {
  let { pathname } = useLoaderData<LoaderData>();
  return (
    <main className="space-y-4">
      <h2 className="text-3xl font-black">404 Not Found</h2>
      <p>The requested URL {pathname} was not found on this server.</p>
    </main>
  );
}
