import Link from 'next/link';
import format from 'date-fns/format';
import classNames from 'classnames/dedupe';
import PropTypes from 'prop-types';
import compose from 'recompose/compose';
import setDisplayName from 'recompose/setDisplayName';
import setPropTypes from 'recompose/setPropTypes';
import setStatic from 'recompose/setStatic';

import Site from './site.js';

import parseUrl from '../../lib/parse-url.js';
import * as colors from '../../lib/colors.js';
import * as CustomTypes from '../../lib/types.js';

export default compose(
  setDisplayName('Essay'),
  setPropTypes({
    title: PropTypes.string.isRequired,
    link: PropTypes.string.isRequired,
    date: PropTypes.string.isRequired,
    highlighted: PropTypes.bool,
    deprecated: PropTypes.bool
  }),
  setStatic('defaultProps', {
    highlighted: false,
    deprecated: false
  })
)(({ title, link, date, highlighted, deprecated }) => (
  <article className={classNames('essay', { highlighted, deprecated })}>
    <time className="date">{format(date, 'MMMM DD, YYYY')}</time>

    <h2 className="title">
      <Link href={link}>
        <a
          target={parseUrl(link).hostname !== null ? '_blank' : '_self'}
          className="link"
        >
          {title}
        </a>
      </Link>{' '}
      <Site link={link} isSelf={parseUrl(link).hostname === null} />
    </h2>

    <style jsx>{`
      .essay {
        display: flex;
        flex-direction: column;
        margin: 1em 0;
      }

      .link {
        flex: 1;
        color: ${colors.black};
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

      .essay.highlighted .title {
        background-color: ${colors.black};
      }

      .essay.highlighted .title :global(*) {
        color: ${colors.white};
      }

      .essay.deprecated {
        opacity: 0.5;
        z-index: 1;
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
