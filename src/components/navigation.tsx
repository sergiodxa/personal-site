import * as React from "react";
import clsx from "clsx";
import Link from "next/link";
import Head from "next/head";
import { Spacer } from "./spacer";
import { MemojiName } from "./memoji";

const links: Array<{ href: string; label: string; title: string }> = [
  { href: "/articles", label: "Articles", title: "My Articles" },
  { href: "/about", label: "About", title: "About me" },
  { href: "/bookmarks", label: "Bookmarks", title: "Links I Read" },
  { href: "/reader", label: "Reader", title: "Blogs I Follow" },
  // { href: "/ama", label: "AMA", title: "Ask me Anything!" },
  // { href: "/til", label: "TIL", title: "Today I Learned" },
  { href: "/uses", label: "Uses", title: "What I Use" },
  { href: "/oss", label: "OSS", title: "Open Source I wrote" },
  // { href: "/hire", label: "Hire me!" },
];

function formatOGURL(title: string, description: string) {
  const eTitle = encodeURIComponent(title);
  const eDescription = encodeURIComponent(description);
  return `https://i.microlink.io/https%3A%2F%2Fcards.microlink.io%2F%3Fpreset%3Dcontentz%26title%3D$${eTitle}%26description%3D${eDescription}`;
}

export function Navigation({
  current,
  title,
  description = "T-Shaped Frontend Engineer",
}: {
  current: string;
  title?: string;
  description?: string;
}) {
  const isHome = current.toLowerCase() === "home";

  return (
    <>
      <Head>
        {title ? (
          <title>{title} | Sergio Xalambri</title>
        ) : (
          <title>Sergio Xalambrí</title>
        )}

        <meta name="description" content={description} />

        {/* Open Graph */}
        <meta property="og:title" content={title ?? "Sergio Xalambrí"} />
        <meta property="og:description" content={description} />
        <meta
          property="og:image"
          content={formatOGURL(title ?? "Sergio Xalambrí", description)}
        />
        <meta property="og:image:alt" content={`${title}\n${description}`} />
        <meta property="og:url" content="https://sergiodxa.com/" />

        {/* Twitter Card */}
        <meta name="twitter:title" content={title ?? "Sergio Xalambrí"} />
        <meta name="twitter:description" content={description} />
        <meta
          name="twitter:image"
          content={formatOGURL(title ?? "Sergio Xalambrí", description)}
        />
        <meta name="twitter:summary" content={description} />
        <meta name="twitter:url" content="https://sergiodxa.com/" />
      </Head>

      <nav className="flex py-4 items-center space-x-2">
        {!isHome ? (
          <Link href="/">
            <a
              aria-current={isHome ? "page" : "false"}
              className="flex-shrink-0"
            >
              <span className="text-xl leading-none relative flex-shrink-0 font-extrabold text-gray-900 dark:text-gray-100">
                Sergio Xalambrí
              </span>
            </a>
          </Link>
        ) : null}

        <Spacer />

        <ul className="flex text-md overflow-x-auto">
          {links.map((link) => {
            const isActive = current.toLowerCase() === link.label.toLowerCase();
            return (
              <li key={link.href} className="px-2 flex-shrink-0">
                <Link href={link.href}>
                  <a
                    className={clsx(
                      "text-blue-600 dark:text-blue-500 font-semibold",
                      {
                        "no-underline hover:underline": isActive,
                        "underline hover:no-underline": !isActive,
                      }
                    )}
                    aria-current={isActive ? "page" : "false"}
                    title={link.title}
                  >
                    {link.label}
                  </a>
                </Link>
              </li>
            );
          })}
        </ul>
      </nav>
    </>
  );
}
