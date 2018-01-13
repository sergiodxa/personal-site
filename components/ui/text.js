import * as colors from "../../lib/colors";
import parseUrl from "../../lib/parse-url";

export function A({
  color = "black",
  decoration = "none",
  children,
  ...props
}) {
  const { hostname } = parseUrl(props.href);
  const self = hostname === "sergiodxa.com";

  return (
    <a {...props} target={!self ? "_blank" : "_self"}>
      {children}
      <style jsx>{`
        a {
          color: ${colors[color]};
          text-decoration: ${decoration};
        }
      `}</style>
    </a>
  );
}

export function P({ children, ...props }) {
  return (
    <p {...props}>
      {children}
      <style jsx>{`
        p {
          margin: 1em 0;
          font-size: 1.25em;
        }
      `}</style>
    </p>
  );
}

export function BlockQuote({ children, ...props }) {
  return (
    <blockquote {...props}>
      {children}
      <style jsx>{`
        blockquote {
          border-left: 3px solid rgba(0, 0, 0, 0.84);
          box-sizing: border-box;
          padding-left: calc(2em - 3px);
          margin-left: -2em;
          margin-right: 0;
          font-weight: normal;
          font-style: italic;
          font-size: 1em;
        }

        blockquote :global(p) {
          margin: 0;
        }
      `}</style>
    </blockquote>
  );
}

export function Abbr({ children, ...props }) {
  return (
    <abbr {...props}>
      {children}
      <style jsx>{`
        abbr {
          cursor: help;
          text-decoration-style: dashed;
          text-decoration-color: ${colors.grey};
        }
      `}</style>
    </abbr>
  );
}

export function Mark({ children, ...props }) {
  return (
    <mark {...props}>
      {children}
      <style jsx>{`
        mark {
          background-color: ${colors.pink};
          color: white;
          padding: 0.125em 0.2em;
        }
      `}</style>
    </mark>
  );
}
