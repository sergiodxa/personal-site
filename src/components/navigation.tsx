import * as React from "react";
import clsx from "clsx";
import Link from "next/link";
import Head from "next/head";
import { Spacer } from "./spacer";
import { MemojiName, Memoji } from "./memoji";

const links: Array<{ href: string; label: string }> = [
  { href: "/articles", label: "Articles" },
  // { href: "/talks", l/abel: "Talks" },
  // { href: "/oss", label: "Open Source" },
  { href: "/bookmarks", label: "Bookmarks" },
  // { href: "/uses", label: "Stack" },
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
            <span
              className="text-xl leading-none relative flex-shrink-0 font-semibold hidden md:inline"
              style={{
                background: "linear-gradient(90deg, #ED8936, #F6E05E)",
                backgroundClip: "text",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                height: 27,
              }}
            >
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
            const isActive = current === link.label.toLowerCase();
            return (
              <li key={link.href} className="px-2 flex-shrink-0">
                <Link href={link.href}>
                  <a
                    className={clsx("text-orange-500 font-semibold", {
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
