import Head from 'next/head';
import Link from 'next/link';

import Header from '../components/header.js';
import Layout from '../layouts/main.js';

import compose from 'recompose/compose';

import withGA from '../lib/with-ga.js';
import withSW from '../lib/with-sw.js';
import withError from '../lib/with-error.js';
import * as colors from '../lib/colors.js';

export default compose(withError, withGA, withSW)(() => (
  <Layout>
    <Head>
      <title>Sergio Xalambrí</title>
    </Head>

    <Header centered />

    <nav>
      <Link href="/about" prefetch>
        <a title="About Sergio Xalambrí">About me</a>
      </Link>
      <Link href="/essays" prefetch>
        <a title="Essays and Articles">Essays</a>
      </Link>
      <a href="https://twitter.com/@sergiodxa" title="Opinion" rel="me">
        Opinion
      </a>
      <a href="https://github.com/sergiodxa" title="Code repositories" rel="me">
        Code
      </a>
    </nav>

    <style jsx>{`
      nav {
        display: flex;
        flex-wrap: wrap;
        justify-content: center;
        font-size: 1em;
        position: fixed;
        padding-top: 1em;
        top: 0;
        left: 0;
        right: 0;
        text-align: center;
      }
      a {
        color: ${colors.black};
        padding: 0.25em 0.5em;
        text-decoration: none;
      }
      a:hover {
        text-decoration: underline;
      }
      @media (min-width: 720px) {
        nav {
          padding-top: 0;
        }
        a {
          font-size: 1.25em;
          padding: 1em;
        }
      }
    `}</style>
  </Layout>
));
