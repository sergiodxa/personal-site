import Link from "next/link";
import Router, { useRouter } from "next/router";
import clsx from "clsx";
import { FiCommand } from "react-icons/fi";
import { motion } from "framer-motion";

const links = [
  { href: "/", label: "About" },
  { href: "/articles", label: "Articles" },
  { href: "/links", label: "Bookmarks" },
  { href: "/cv", label: "Resume" },
];

const baseClassName = "block py-2 px-6 text-yellow-500 light:text-indigo-500";
const activeClassName = clsx(
  baseClassName,
  "text-white border-b border-yellow-500 light:border-indigo-500"
);

export default function Navigation() {
  const { pathname } = useRouter();
  return (
    <nav className="mb-4">
      {/* Desktop Menu */}
      <ul className="hidden md:flex">
        {links.map((link) => (
          <li key={link.href}>
            <Link href={link.href}>
              <motion.a
                href={link.href}
                animate
                className={
                  link.href === pathname ? activeClassName : baseClassName
                }
              >
                {link.label}
              </motion.a>
            </Link>
          </li>
        ))}
      </ul>
      {/* Mobile Menu */}
      <label
        htmlFor="menu"
        className="md:hidden flex items-center px-4 space-x-4 text-black bg-yellow-500 light:text-indigo-100 light:bg-indigo-500"
      >
        <FiCommand />
        <span className="sr-only">Open Menu</span>
        <select
          id="menu"
          value={pathname}
          onChange={(event) => Router.push(event.target.value)}
          className="appearance-none bg-transparent w-full py-2 focus:outline-none rounded-none"
        >
          {links.map((link) => (
            <option value={link.href} key={link.href}>
              {link.label}
            </option>
          ))}
        </select>
      </label>
    </nav>
  );
}
