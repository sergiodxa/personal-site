import * as React from "react";
import clsx from "clsx";
import Link from "next/link";
import Head from "next/head";
import { Spacer } from "./spacer";
import { MemojiName, Memoji } from "./memoji";

const links: Array<{ href: string; label: string }> = [
  { href: "/articles", label: "Articles" },
  { href: "/bookmarks", label: "Bookmarks" },
  { href: "/ama", label: "Ask Me!" },
  { href: "/uses", label: "Uses" },
  // { href: "/oss", label: "Open Source" },
  // { href: "/hire", label: "Hire me!" },
];

export function Navigation({
  current,
  title,
  memoji = "happy",
}: {
  current: string;
  title?: string;
  memoji?: MemojiName;
}) {
  const isHome = current === "home";

  return (
    <>
      <Head>
        {title ? (
          <title>{title} | Sergio Xalambri</title>
        ) : (
          <title>Sergio Xalambrí</title>
        )}
      </Head>

      <nav className="flex py-4 items-baseline space-x-2">
        <Link href="/">
          <a aria-current={isHome ? "page" : "false"}>
            <span className="text-xl leading-none relative flex-shrink-0 font-semibold hidden md:inline bg-gradient-to-r from-orange-400 to-yellow-400 text-transparent bg-clip-text">
              Sergio Xalambrí
            </span>
            <Memoji
              name={memoji}
              className="inline md:hidden w-5 h-5 transform scale-150"
            />
          </a>
        </Link>

        <Spacer />

        <ul className="flex text-sm overflow-x-auto">
          {links.map((link) => {
            const isActive = current.toLowerCase() === link.label.toLowerCase();
            return (
              <li key={link.href} className="px-2 flex-shrink-0">
                <Link href={link.href}>
                  <a
                    className={clsx("text-orange-400 font-semibold", {
                      "no-underline": isActive,
                      underline: !isActive,
                    })}
                    aria-current={isActive ? "page" : "false"}
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
