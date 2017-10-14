function className({ centered, sticky }) {
  return `${centered ? 'centered' : ''} ${sticky ? 'sticky' : ''}`.trim();
}

export default ({ centered, sticky = true, secondary }) => (
  <header className={className({ centered, sticky })}>
    {!secondary
      ? <h1>Sergio Xalambrí</h1>
      : <h2>Sergio Xalambrí</h2>
    }

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
        color: black;
        text-decoration: none;
      }

      header {
        display: flex;
        text-align: center;
        padding: 1em;
        box-sizing: border-box;
      }

      header:not(.centered) {
        background: white;
        top: 0;
        z-index: 2;
      }

      header:not(.centered).sticky {
        position: -webkit-sticky;
        position: sticky;
      }

      h1,
      h2 {
        font-size: 1em;
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
    `}</style>
  </header>
);
