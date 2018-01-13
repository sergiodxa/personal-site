import Link from "next/link";
import PropTypes from "prop-types";
import compose from "recompose/compose";
import setDisplayName from "recompose/setDisplayName";
import setPropTypes from "recompose/setPropTypes";
import setStatic from "recompose/setStatic";
import classnames from "classnames/dedupe";

import * as colors from "../lib/colors.js";

import { H1, H2, H3 } from "./ui/heading";
import { A } from "./ui/text";

const Header = compose(
  setDisplayName("Header"),
  setPropTypes({
    centered: PropTypes.bool,
    sticky: PropTypes.bool,
    secondary: PropTypes.bool
  }),
  setStatic("defaultProps", {
    centered: false,
    sticky: false,
    secondary: false
  })
)(({ centered, sticky, secondary }) => (
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
      }

      header:not(.centered) {
        background: ${colors.white};
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
));

export const LinkedHeader = ({ href = "/", sticky = true }) => (
  <Link href={href} prefetch>
    <a title="Sergio Xalambrí" rel="home">
      <Header sticky={sticky} secondary />
      <style jsx>{`
        a {
          color: ${colors.black};
          text-decoration: none;
        }
      `}</style>
    </a>
  </Link>
);

export default Header;
