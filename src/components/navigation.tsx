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

const baseStyles = "block py-1 px-4";
const inactiveClassName = clsx(
  baseStyles,
  "text-yellow-500 light:text-indigo-500"
);
const activeClassName = clsx(
  baseStyles,
  "text-white border-yellow-500 light:text-black light:border-indigo-500"
);

export default function Navigation() {
  const { pathname } = useRouter();
  return (
    <nav className="mb-4">
      {/* Desktop Menu */}
      <ul className="p-2 hidden md:flex space-x-2">
        {links.map((link) => (
          <li key={link.href}>
            <Link href={link.href}>
              <motion.a
                href={link.href}
                className={
                  link.href === pathname ? activeClassName : inactiveClassName
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
