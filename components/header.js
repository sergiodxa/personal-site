import Link from "next/link";

import { dark, light } from "@sergiodxa/palette";

import { H3 } from "@sergiodxa/ui/lib/headings";

function Header() {
  return (
    <header className="h-card">
      <H3 className="secondary">Sergio Xalambrí</H3>
      <style jsx>{`
        header {
          background: ${light};
          top: 0;
          z-index: 2;
          display: flex;
          text-align: center;
          padding: 1em;
          box-sizing: border-box;
          margin: 0 1em;
        }
  
        @media (max-width: 720px) {
          header {
            display: block;
          }
          header :global(h1) {
            width: 100%;
          }
        }
      `}</style>
    </header>
  );
}

export const LinkedHeader = ({ href = "/" }) => (
  <Link href={href} prefetch>
    <a title="Sergio Xalambrí" rel="home">
      <Header />
      <style jsx>{`
        a {
          color: ${dark};
          text-decoration: none;
        }
      `}</style>
    </a>
  </Link>
);

export default Header;
