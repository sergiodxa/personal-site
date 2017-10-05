import Head from 'next/head';
import Link from 'next/link';

import Essay from '../components/essays/essay.js';
import Header from '../components/header.js';
import Layout from '../layouts/main.js';

import essays from '../data/essays.js';

import compose from 'recompose/compose';

import withError from '../lib/with-error.js';
import withGA from '../lib/with-ga.js';
import withSW from '../lib/with-sw.js';

const byDate = (a, b) => {
  const timeA = new Date(a.date).getTime();
  const timeB = new Date(b.date).getTime();

  if (timeA > timeB) return -1;
  if (timeA < timeB) return 1;
  return 0;
};
const toComponent = essay => <Essay key={essay.link} {...essay} />;

export default compose(withError, withGA, withSW)(() => (
  <Layout>
    <Head>
      <title>Essays and Articles by Sergio Xalambrí</title>
    </Head>

    <Link href="/" prefetch>
      <a title="Sergio Xalambrí">
        <Header />
      </a>
    </Link>

    <section>{essays.sort(byDate).map(toComponent)}</section>

    <style jsx global>{`
      main {
        margin-bottom: 2em;
      }
    `}</style>
    <style jsx>{`
      a {
        color: black;
        text-decoration: none;
      }

      section {
        padding: 0.5em;
      }

      @media (min-width: 720px) {
        section {
          padding: 1em;
        }
      }
    `}</style>
  </Layout>
));
