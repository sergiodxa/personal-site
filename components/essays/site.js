import { format } from "url";
import Link from "next/link";
import PropTypes from "prop-types";

import parseUrl from "../../lib/parse-url.js";
import { dark } from "@sergiodxa/palette";

function Site({ link, isSelf }) {
  return (
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
          color: ${dark};
          font-weight: lighter;
        }

        .site-url:hover {
          text-decoration: underline;
        }
      `}</style>
    </small>
  );
}

Site.propTypes = {
  link: PropTypes.string.isRequired,
  isSelf: PropTypes.bool
};

Site.defaultProps = {
  isSelf: false
};

export default Site;
