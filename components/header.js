import PropTypes from 'prop-types';
import compose from 'recompose/compose';
import setDisplayName from 'recompose/setDisplayName';
import setPropTypes from 'recompose/setPropTypes';
import setStatic from 'recompose/setStatic';
import classnames from 'classnames/dedupe';

import * as colors from '../lib/colors.js';

export default compose(
  setDisplayName('Header'),
  setPropTypes({
    centered: PropTypes.bool,
    sticky: PropTypes.bool,
    secondary: PropTypes.bool
  }),
  setStatic('defaultProps', {
    centered: false,
    sticky: false,
    secondary: false
  })
)(({ centered, sticky, secondary }) => (
  <header className={classnames('h-card', { centered, sticky })}>
    {!secondary ? <h1>Sergio Xalambrí</h1> : <h2>Sergio Xalambrí</h2>}

    {centered && (
      <h2>
        Lead Support Engineer at{' '}
        <strong>
          <a
            title="▲ ZEIT"
            href="https://zeit.co"
            target="_blank"
            rel="noopener"
          >
            ▲ ZEIT
          </a>
        </strong>
      </h2>
    )}

    <style jsx>{`
      a {
        color: ${colors.black};
        text-decoration: none;
      }

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

      h1,
      h2 {
        font-size: 1.5em;
        font-weight: 200;
        padding: 0.25em 0;
        margin: 0;
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

      .centered h1 {
        font-size: 2em;
      }

      @media (max-width: 720px) {
        header:not(.centered) {
          display: block;
        }
        header:not(.centered) h1 {
          width: 100%;
        }
      }

      @media (min-width: 720px) {
        h2 {
          font-size: 2.5em;
        }
        .centered h1 {
          font-size: 2.5em;
        }
      }
    `}</style>
  </header>
));
