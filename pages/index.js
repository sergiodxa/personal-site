import Link from 'next/link'

import Header from '../components/header.js'

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

    <style jsx global>{`
      body {
        font-family: Arial, sans-serif;
        margin: 0;
        font-size: 18px;
      }
    `}</style>

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
      nav a {
        color: black;
        padding: .25em .5em;
        text-decoration: none;
      }
      nav a:hover {
        text-decoration: underline;
      }
    `}</style>
  </main>
)
