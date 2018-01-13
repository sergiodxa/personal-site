import * as colors from "../../lib/colors";

export function UL({ children, ...props }) {
  return (
    <ul {...props}>
      {children}
      <style jsx>{`
        ul {
          font-size: 1.3em;
          font-weight: normal;
          margin-left: -2rem;
          padding-left: 2rem;
          list-style-type: square;
        }

        @media (max-width: 767px) {
          ul {
            font-size: 1em;
            margin-left: 0;
            padding-left: 2rem;
          }
        }
      `}</style>
    </ul>
  );
}

export function OL({ children, ...props }) {
  return (
    <ol {...props}>
      {children}
      <style jsx>{`
        ol {
          font-size: 1.3em;
          font-weight: normal;
          margin-left: -2rem;
          padding-left: 2rem;
          list-style-type: lower-roman;
        }

        @media (max-width: 767px) {
          ol {
            font-size: 1em;
            margin-left: 0;
            padding-left: 2rem;
          }
        }
      `}</style>
    </ol>
  );
}

export function LI({ children, ...props }) {
  return (
    <li {...props}>
      {children}
      <style jsx>{`
        li {
          line-height: 1.5;
        }
      `}</style>
    </li>
  );
}

export function DL({ children, ...props }) {
  return (
    <dl {...props}>
      {children}
      <style jsx>{`
        dl {
          border: 1px solid ${colors.grey};
          padding: 0.75em;
        }
      `}</style>
    </dl>
  );
}

export function DT({ children, ...props }) {
  return (
    <dt {...props}>
      {children}
      <style jsx>{`
        dt {
          font-size: 1.25em;
          font-weight: lighter;
        }
      `}</style>
    </dt>
  );
}

export function DD({ children, ...props }) {
  return (
    <dd {...props}>
      {children}
      <style jsx>{`
        dd {
          margin-left: 0;
        }
      `}</style>
    </dd>
  );
}
