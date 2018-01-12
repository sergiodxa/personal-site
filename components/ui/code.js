import { Children } from 'react';
import { safeLoad } from 'js-yaml';

import * as colors from '../../lib/colors';

export function Code({ children, ...props }) {
  return (
    <code {...props}>
      {children}
      <style jsx>{`
        code {
          color: ${colors.pink};
          font-family: Menlo, Monaco, Lucida Console, Liberation Mono,
            DejaVu Sans Mono, Bitstream Vera Sans Mono, Courier New, monospace,
            serif;
          font-size: 0.8em;
          white-space: pre-wrap;
        }

        code:before {
          content: '\`';
        }

        code:after {
          content: '\`';
        }

        code[class~='language-javascript'],
        code[class~='language-js'],
        code[class~='language-html'],
        code[class~='language-css'],
        code[class~='language-styl'],
        code[class~='language-saas'],
        code[class~='language-less'],
        code[class~='language-ruby']) {
          tab-size: 8;
        }
        code[class~='language-java'],
        code[class~='language-python'],
        code[class~='language-php']) {
          tab-size: 4;
        }
        code[class~='language-go']) {
          tab-size: 8;
        }
      `}</style>
    </code>
  );
}

export function Pre({ children, ...props }) {
  return (
    <pre {...props}>
      {children}
      <style jsx>{`
        pre {
          border: 1px solid ${colors.black};
          padding: 1rem calc(2rem - 1px);
          margin: 1rem -2rem;
          overflow-x: scroll;
        }

        pre :global(code) {
          color: ${colors.black};
          font-family: Menlo, Monaco, Lucida Console, Liberation Mono,
            DejaVu Sans Mono, Bitstream Vera Sans Mono, Courier New, monospace,
            serif;
          font-size: 0.8em;
        }
        pre :global(code:after),
        pre :global(code:before) {
          content: '';
        }
      `}</style>
    </pre>
  );
}
