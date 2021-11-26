import NProgress from "nprogress";
import nProgressStyles from "nprogress/nprogress.css";
import { useEffect } from "react";
import type {
  HeadersFunction,
  LinksFunction,
  LoaderFunction,
  MetaFunction,
} from "remix";
import {
  Links,
  LiveReload,
  Meta,
  NavLink,
  Outlet,
  Scripts,
  useLoaderData,
  useTransition,
} from "remix";
import { json } from "remix-utils";
import { CacheControl } from "~/services/cache-control";
import { cn, sitePath } from "~/services/cn.server";
import globalStyles from "~/styles/global.css";
import tailwindStyles from "~/styles/tailwind.css";
import { env } from "~/utils";
type LoaderData = {
  name: string;
};

export let headers: HeadersFunction = () => {
  return { "Cache-Control": new CacheControl("swr").toString() };
};

export let links: LinksFunction = () => {
  return [
    { rel: "stylesheet", href: tailwindStyles },
    { rel: "stylesheet", href: globalStyles },
    { rel: "stylesheet", href: nProgressStyles },
  ];
};

export let meta: MetaFunction = () => {
  return {
    "apple-mobile-web-app-capable": "yes",
    "apple-mobile-web-app-status-bar-style": "black-transparent",
    "apple-mobile-web-app-title": "Sergio Xalambrí",
    "format-detection": "telephone=no",
    "mobile-web-app-capable": "yes",
    "msapplication-config": "/browserconfig.xml",
    "msapplication-TileColor": "#000",
    "og:locale": "en",
    "og:site_name": "Sergio Xalambrí",
    "og:type": "website",
    "theme-color": "#000",
    "twitter:card": "summary_large_image",
    "twitter:creator": "@sergiodxa",
    "twitter:site": "@sergiodxa",
    "X-UA-Compatible": "IE=edge,chrome=1",
    author: "Sergio Xalambrí",
    HandheldFriendly: "True",
    language: "en",
    MobileOptimized: "320",
    pagename: "Sergio Xalambrí",
    robots: "index, follow",
    title: "Sergio Xalambrí",
    viewport: "width=device-width, initial-scale=1, viewport-fit=cover",
  };
};

export let loader: LoaderFunction = async () => {
  let { site } = await cn.site(sitePath, 1, "public");
  return json<LoaderData>({ name: site.name });
};

function Document({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head>
        <meta charSet="utf-8" />
        <link rel="icon" href="/favicon.png" type="image/png" />
        <Meta />
        <Links />
      </head>
      <body className="font-sans max-w-screen-xl mx-auto p-10">
        {children}

        <Scripts />
        {env("production") && (
          <>
            <script src="https://www.googletagmanager.com/gtag/js?id=UA-48432002-3" />
            <script src="/scripts/analytics" />
          </>
        )}
        {env("development") && <LiveReload />}
      </body>
    </html>
  );
}

export default function App() {
  let { name } = useLoaderData<LoaderData>();

  let transition = useTransition();
  useEffect(() => {
    // when the state is idle then we can to complete the progress bar
    if (transition.state === "idle") NProgress.done();
    // and when it's something else it means it's either submitting a form or
    // waiting for the loaders of the next location so we start it
    else NProgress.start();
  }, [transition.state]);

  return (
    <Document>
      <header className="mb-4">
        <h1 className="text-4xl font-black leading-none">{name}</h1>
      </header>

      <nav className="mb-10 border-b border-black pb-1 flex justify-between items-center">
        <ul className="flex space-x-4 text-lg">
          <li>
            <NavLink to="/">Home</NavLink>
          </li>
          <li>
            <NavLink to="/articles">Articles</NavLink>
          </li>
          <li>
            <NavLink to="/bookmarks">Bookmarks</NavLink>
          </li>
        </ul>
        <aside className="flex justify-end w-full">
          <iframe
            src="https://github.com/sponsors/sergiodxa/button"
            title="Sponsor sergiodxa"
            height="35"
            width="116"
            className="border-0"
          />
        </aside>
      </nav>

      <Outlet />
    </Document>
  );
}

export function ErrorBoundary({ error }: { error: Error }) {
  return (
    <Document>
      <h1>App Error</h1>
      <pre>{error.message}</pre>
      <p>
        Replace this UI with what you want users to see when your app throws
        uncaught errors.
      </p>
    </Document>
  );
}
