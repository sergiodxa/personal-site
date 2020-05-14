import Link from "next/link";
import Router, { useRouter } from "next/router";
import clsx from "clsx";

const links = [
  { href: "/", label: "About me" },
  { href: "/articles", label: "Articles" },
  { href: "/talks", label: "Talks" },
  { href: "/channel", label: "Channel" },
  { href: "/lessons", label: "Lessons" },
  { href: "/cv", label: "CV" },
];

const baseClassName = "block py-2 px-6 text-yellow-500";
const activeClassName = clsx(
  baseClassName,
  "text-white border-b border-yellow-500"
);

export default function Navigation() {
  const { pathname } = useRouter();
  return (
    <nav className="">
      {/* Desktop Menu */}
      <ul className="hidden md:flex">
        {links.map((link) => (
          <li key={link.href}>
            <Link href={link.href}>
              <a
                className={
                  link.href === pathname ? activeClassName : baseClassName
                }
              >
                {link.label}
              </a>
            </Link>
          </li>
        ))}
      </ul>
      {/* Mobile Menu */}
      <select
        value={pathname}
        onChange={(event) => Router.push(event.target.value)}
        className="text-black md:hidden"
      >
        {links.map((link) => (
          <option value={link.href} key={link.href}>
            {link.label}
          </option>
        ))}
      </select>
    </nav>
  );
}
