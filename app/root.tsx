import type { MetaFunction } from "@remix-run/node";
import type { LinksFunction } from "@remix-run/react";
import { Links, Meta, Scripts, useMatches } from "@remix-run/react";
import { Outlet } from "react-router-dom";
import globalCSS from "./styles/global.css";
import interCSS from "./styles/inter.css";

export const links: LinksFunction = () => {
  return [
    { rel: "stylesheet", href: globalCSS },
    { rel: "stylesheet", href: interCSS },
    { rel: "icon", href: "/static/favicon@48.png" },
  ];
};

export const meta: MetaFunction = () => {
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

export default function App() {
  const matches = useMatches();
  const includeScripts = matches.some((match) => match.handle?.hydrate);

  return (
    <html
      lang="en"
      className="bg-gray-100 text-gray-900 dark:bg-gray-900 dark:text-gray-100"
    >
      <head>
        <meta charSet="utf-8" />
        <Meta />
        <Links />
      </head>
      <body className="mb-4">
        <Outlet />
        {includeScripts && <Scripts />}
      </body>
    </html>
  );
}

export function ErrorBoundary({ error }: { error: Error }) {
  return (
    <html lang="en">
      <head>
        <meta charSet="utf-8" />
        <title>Oops!</title>
        <Links />
      </head>
      <body>
        <div>
          <h1>App Error</h1>
          <pre>{error.message}</pre>
          <p>
            Replace this UI with what you want users to see when your app throws
            uncaught errors. The file is at <code>app/App.tsx</code>.
          </p>
        </div>

        <Scripts />
      </body>
    </html>
  );
}
