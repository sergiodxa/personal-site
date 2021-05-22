import { NavLink, Outlet } from "react-router-dom";
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
  Scripts,
  useMatches,
  usePendingLocation,
  useRouteData,
} from "remix";
import { json } from "remix-utils";
import { CacheControl } from "./cache-control";
import { cn, sitePath } from "./cn.server";
import { Spinner } from "./components/spinner";
import globalStyles from "./styles/global.css";
import tailwindStyles from "./styles/tailwind.css";
import { env } from "./utils";

interface RouteData {
  date: string;
  name: string;
}

export let headers: HeadersFunction = () => {
  return { "Cache-Control": new CacheControl("swr").toString() };
};

export let links: LinksFunction = () => {
  return [
    { rel: "stylesheet", href: tailwindStyles },
    { rel: "stylesheet", href: globalStyles },
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
  return json<RouteData>({
    date: new Date().toJSON(),
    name: site.name,
  });
};

function Document({ children }: { children: React.ReactNode }) {
  const matches = useMatches();
  const includeScripts = matches.some((match) => match.handle?.hydrate);
  const pendingLocation = usePendingLocation();
  return (
    <html lang="en">
      <head>
        <meta charSet="utf-8" />
        <link rel="icon" href="/favicon.png" type="image/png" />
        <Meta />
        <Links />
      </head>
      <body className="font-sans max-w-screen-xl mx-auto p-10">
        {pendingLocation ? <Spinner className="fixed top-2 right-2" /> : null}

        {children}

        {includeScripts && <Scripts />}
        {env("production") && (
          <>
            <script
              async
              src="https://www.googletagmanager.com/gtag/js?id=UA-48432002-3"
            />
            <script
              dangerouslySetInnerHTML={{
                __html: `
                  window.dataLayer = window.dataLayer || [];
                  function gtag(){dataLayer.push(arguments);}
                  gtag('js', new Date());
                  gtag('config', 'UA-48432002-3');
                `,
              }}
            />
          </>
        )}
        {env("development") && <LiveReload />}
      </body>
    </html>
  );
}

export default function App() {
  let { date, name } = useRouteData<RouteData>();

  let dateTimeFormat = new Intl.DateTimeFormat("en", {
    dateStyle: "full",
    timeStyle: "medium",
  });

  return (
    <Document>
      <header className="mb-4">
        <h1 className="text-4xl font-black leading-none">{name}</h1>
      </header>

      <nav className="mb-10 border-b border-black pb-1">
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
      </nav>

      <Outlet />

      <footer className="text-center mt-10 text-xs">
        <p>This page was rendered at {dateTimeFormat.format(new Date(date))}</p>
      </footer>
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
