import Link from 'next/link'

import Header from '../components/shared/header.js'

import withSW from '../lib/with-sw.js'

export default withSW(() =>
  <main>
    <Header centered />

    <nav>
      <Link href="/essays" prefetch>
        <a title="Essays and Articles">Essays</a>
      </Link>
      <a href="https://twitter.com/@sergiodxa" title="Opinion">
        Opinion
      </a>
      <a href="https://github.com/sergiodxa" title="Code repositories">
        Code
      </a>
      <a href="https://github.com/sergiodxa/personal-site/issues/new" title="Ask Me Anything">
        AMA
      </a>
    </nav>

    <style jsx>{`
      nav {
        display: flex;
        flex-wrap: wrap;
        justify-content: center;
        font-size: .9em;
        position: fixed;
        padding-bottom: 1em;
        bottom: 0;
        left: 0;
        right: 0;
        text-align: center;
      }
      a {
        color: black;
        padding: .25em .5em;
        text-decoration: none;
      }
      a:hover {
        text-decoration: underline;
      }
      @media (min-width: 720px) {
        nav {
          top: 0;
          bottom: auto;
        }
        a {
          font-size: 1.25em;
          padding: 1em;
        }
      }
    `}</style>
  </main>
)
