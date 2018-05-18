import { format } from "url";
import Link from "next/link";
import PropTypes from "prop-types";
import compose from "recompose/compose";
import setDisplayName from "recompose/setDisplayName";
import setPropTypes from "recompose/setPropTypes";
import setStatic from "recompose/setStatic";

import parseUrl from "../../lib/parse-url.js";
import { grey } from "@sergiodxa/palette";

export default compose(
  setDisplayName("Site"),
  setPropTypes({
    link: PropTypes.string.isRequired,
    isSelf: PropTypes.bool
  }),
  setStatic("defaultProps", {
    isSelf: false
  })
)(({ link, isSelf }) => (
  <small className="site">
    {isSelf ? (
      <Link href="/" prefetch>
        <a className="site-url">[self]</a>
      </Link>
    ) : (
      <a
        className="site-url"
        href={format({
          hostname: parseUrl(link).hostname,
          protocol: parseUrl(link).protocol
        })}
        target="_blank"
        rel="noopener"
      >
        [{parseUrl(link).hostname}]
      </a>
    )}
    <style jsx>{`
      .site {
        font-size: 0.7em;
      }

      .site-url {
        flex: 1;
        text-decoration: none;
        color: ${grey};
      }

      .site-url:hover {
        text-decoration: underline;
      }
    `}</style>
  </small>
));
