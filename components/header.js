import Link from "next/link";
import PropTypes from "prop-types";
import classnames from "classnames/dedupe";

import { dark, light } from "@sergiodxa/palette";

import { H1, H2, H3 } from "@sergiodxa/ui/lib/headings";
import { A } from "@sergiodxa/ui/lib/text";

function Header({ centered, sticky, secondary }) {
  return (
    <header className={classnames("h-card", { centered, sticky })}>
      {!secondary ? (
        <H1>Sergio Xalambrí</H1>
      ) : (
        <H3 className="secondary">Sergio Xalambrí</H3>
      )}
  
      {centered && (
        <H2>
          Lead Support Engineer at{" "}
          <strong>
            <A
              title="▲ ZEIT"
              href="https://zeit.co"
              target="_blank"
              rel="noopener"
              color={dark}
            >
              ▲ ZEIT
            </A>
          </strong>
        </H2>
      )}
  
      <style jsx>{`
        header {
          display: flex;
          text-align: center;
          padding: 1em;
          box-sizing: border-box;
          margin: 0 1em;
        }
  
        header:not(.centered) {
          background: ${light};
          top: 0;
          z-index: 2;
        }
  
        header:not(.centered).sticky {
          position: -webkit-sticky;
          position: sticky;
        }
  
        .centered {
          flex-direction: column;
          justify-content: space-between;
          position: fixed;
          top: 50%;
          left: 0;
          right: 0;
          transform: translateY(-50%);
          padding: 0;
        }
  
        .centered :global(h1) {
          font-size: 2em;
        }
  
        @media (max-width: 720px) {
          header:not(.centered) {
            display: block;
          }
          header:not(.centered) :global(h1) {
            width: 100%;
          }
        }
  
        @media (min-width: 720px) {
          h2:not(.secondary) {
            font-size: 2.5em;
          }
          .centered :global(h1) {
            font-size: 2.5em;
          }
        }
      `}</style>
    </header>
  );
}

Header.propTypes = {
  centered: PropTypes.bool,
  sticky: PropTypes.bool,
  secondary: PropTypes.bool
};

Header.defaultProps = {
  centered: false,
  sticky: false,
  secondary: false
};

export const LinkedHeader = ({ href = "/", sticky = true }) => (
  <Link href={href} prefetch>
    <a title="Sergio Xalambrí" rel="home">
      <Header sticky={sticky} secondary />
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
