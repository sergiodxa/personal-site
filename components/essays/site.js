import { format } from 'url'
import parseUrl from '../../lib/parse-url.js'

export default ({ link, isSelf }) =>
  <small className="site">
    <a
      className="site-url"
      href={format({ hostname: parseUrl(link).hostname, protocol: parseUrl(link).protocol })}
      target="_blank"
      rel="noopener"
    >
      [{isSelf ? 'self' : parseUrl(link).hostname}]
    </a>
    <style jsx>{`
      .site {
        font-size: 0.7em;
      }

      .site-url {
        flex: 1;
        text-decoration: none;
        color: rgba(0, 0, 0, .7);
      }

      .site-url:hover {
        text-decoration: underline;
      }
    `}</style>
  </small>
