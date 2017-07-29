import format from 'date-fns/format'

import Site from './site.js'

import parseUrl from '../lib/parse-url.js'

export default ({ title, link, date, highlighted = false, deprecated = false } = {}) =>
  <article
    className={`essay ${highlighted ? 'is-highlighted' : ''} ${deprecated ? 'is-deprecated' : ''}`}
  >
    <time className="date">
      {format(date, 'MMMM DD, YYYY')}
    </time>

    <h2 className="title">
      <a href={link} rel="author" target="_blank" className="link">
        {title}
      </a>{' '}
      <Site link={link} isSelf={parseUrl(link).hostname === 'sergio.now.sh'} />
    </h2>

    <style jsx>{`
      .essay {
        display: flex;
        flex-direction: column;
        margin: 1em 0;
      }

      .link {
        flex: 1;
        color: black;
        text-decoration: none;
        padding: 0 .5em;
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
        font-size: .7em;
        text-align: left;
        padding-right: none;
        width: 100%;
      }

      .title {
        flex: 1;
        font-size: 1em;
        font-weight: 400;
        margin: 0;
      }

      .essay.is-highlighted .link {
        background-color: black;
        color: white;
      }

      .essay.is-deprecated {
        opacity: .5;
      }

      @media (min-width: 720px) {
        .essay {
          flex-direction: row;
          margin: .5em 0;
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
