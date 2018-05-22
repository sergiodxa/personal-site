import Link from "next/link";
import format from "date-fns/format";
import isValid from "date-fns/is_valid";
import classNames from "classnames/dedupe";
import PropTypes from "prop-types";
import compose from "recompose/compose";
import mapProps from "recompose/mapProps";
import setDisplayName from "recompose/setDisplayName";
import setPropTypes from "recompose/setPropTypes";
import setStatic from "recompose/setStatic";

import Site from "./site.js";

import parseUrl from "../../lib/parse-url.js";
import { dark } from "@sergiodxa/palette";

export default compose(
  mapProps(({ date, ...props }) => ({
    ...props,
    date: new Date(date),
    dateString: date
  })),
  setDisplayName("Essay"),
  setPropTypes({
    title: PropTypes.string.isRequired,
    link: PropTypes.string.isRequired,
    date: PropTypes.object.isRequired,
    dateString: PropTypes.string.isRequired,
    highlighted: PropTypes.bool,
    deprecated: PropTypes.bool,
    slug: PropTypes.string
  }),
  setStatic("defaultProps", {
    highlighted: false,
    deprecated: false
  })
)(({ title, link, date, highlighted, deprecated, slug, isStatic }) => (
  <article className={classNames("essay h-entry", { highlighted, deprecated })}>
    <time className="date dt-published">
      {isValid(date) && format(date, "MMMM DD, YYYY")}
    </time>

    <h2 className="title h-name">
      {deprecated && (
        <em title="This essay teachs an old (version of a) technology or is about something that already changed.">
          *
        </em>
      )}{" "}
      <Link
        href={link}
        as={parseUrl(link).hostname !== null ? undefined : link}
        prefetch={parseUrl(link).hostname === null}
      >
        {highlighted ? (
          <strong>
            <a
              href={link}
              target={parseUrl(link).hostname !== null ? "_blank" : "_self"}
              className="link u-url"
            >
              {title}
            </a>
          </strong>
        ) : (
          <a
            href={link}
            target={parseUrl(link).hostname !== null ? "_blank" : "_self"}
            className="link u-url"
          >
            {title}
          </a>
        )}
      </Link>{" "}
      <Site link={link} isSelf={parseUrl(link).hostname === null} />
    </h2>

    <style jsx>{`
      .essay {
        display: flex;
        flex-direction: column;
        margin: 1em 0;
        font-size: 1.25em;
      }

      .link {
        flex: 1;
        color: ${dark};
        text-decoration: none;
      }
      .link:hover {
        text-decoration: underline;
      }

      .essay:first-of-type {
        margin-top: 0;
      }
      .essay:last-of-type {
        margin-bottom: 0;
      }

      .date {
        box-sizing: border-box;
        font-size: 0.7em;
        text-align: left;
        padding-right: none;
        width: 100%;
      }

      .title {
        flex: 1;
        font-size: 1em;
        font-weight: 400;
        margin: 0;
        padding: 0.5em 0.5em;
      }

      .essay.deprecated {
        opacity: 0.5;
        z-index: 1;
      }

      em {
        cursor: help;
        text-decoration: none;
        font-style: normal;
      }

      @media (min-width: 720px) {
        .essay {
          align-items: center;
          flex-direction: row;
          margin: 1em 0;
        }
        .date {
          font-size: 1em;
          text-align: right;
          padding-right: 1em;
          width: 250px;
        }
        .site {
          display: inline;
        }
      }
    `}</style>
  </article>
));
