export default ({ centered }) =>
  <header className={centered ? 'centered' : ''}>
    <h1>Sergio Xalambrí</h1>

    {centered &&
      <h2>
        Lead Support Engineer at{' '}
        <a title="▲ ZEIT" href="https://zeit.co">
          ▲ ZEIT
        </a>
      </h2>}

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

      h1,
      h2 {
        font-size: 1em;
        font-weight: normal;
        padding: .25em 0;
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
