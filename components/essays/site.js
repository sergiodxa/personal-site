import { format } from 'url';
import Link from 'next/link';

import parseUrl from '../../lib/parse-url.js';
import * as colors from '../../lib/colors.js';

export default ({ link, isSelf }) => (
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
        color: ${colors.grey};
      }

      .site-url:hover {
        text-decoration: underline;
      }
    `}</style>
  </small>
);
