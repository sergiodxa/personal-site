export function H1({ children, ...props }) {
  return (
    <h1 {...props}>
      {children}
      <style jsx>{`
        h1 {
          font-size: 2.25em;
          font-weight: lighter;
          letter-spacing: -0.028em;
          margin: 1em 0;
        }
      `}</style>
    </h1>
  );
}

export function H2({ children, ...props }) {
  return (
    <h2 {...props}>
      {children}
      <style jsx>{`
        h2 {
          font-size: 2em;
          font-weight: lighter;
          margin: 0.25em 0;
        }
      `}</style>
    </h2>
  );
}

export function H3({ children, ...props }) {
  return (
    <h3 {...props}>
      {children}
      <style jsx>{`
        h3 {
          font-size: 1.75em;
          font-weight: lighter;
          margin: 0.25em 0;
        }
      `}</style>
    </h3>
  );
}

export function H4({ children, ...props }) {
  return (
    <h4 {...props}>
      {children}
      <style jsx>{`
        h4 {
          font-size: 1.5em;
          font-weight: lighter;
          margin: 0.25em 0;
        }
      `}</style>
    </h4>
  );
}

export function H5({ children, ...props }) {
  return (
    <h5 {...props}>
      {children}
      <style jsx>{`
        h5 {
          font-size: 1.25em;
          font-weight: lighter;
          margin: 0.25em 0;
        }
      `}</style>
    </h5>
  );
}

export function H6({ children, ...props }) {
  return (
    <h6 {...props}>
      {children}
      <style jsx>{`
        h6 {
          font-size: 1.125em;
          font-weight: lighter;
          margin: 0.25em 0;
        }
      `}</style>
    </h6>
  );
}
