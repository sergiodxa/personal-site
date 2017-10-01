import Head from 'next/head';
import Link from 'next/link';

import Essay from '../../components/essays/essay.js';
import Header from '../../components/header.js';
import Layout from '../../layouts/main.js';

import essays from '../../data/essays.js';

import withGA from '../../lib/with-ga.js';
import withSW from '../../lib/with-sw.js';

const sort = (a, b) => {
  const timeA = new Date(a.date).getTime();
  const timeB = new Date(b.date).getTime();

  if (timeA > timeB) return -1;
  if (timeA < timeB) return 1;
  return 0;
};
const map = essay => <Essay key={essay.link} {...essay} />;

export default withGA(
  withSW(() => (
    <Layout>
      <Head>
        <title>Essays and Articles by Sergio Xalambrí</title>
      </Head>

      <Link href="/" prefetch>
        <a title="Sergio Xalambrí">
          <Header />
        </a>
      </Link>

      <section>{essays.sort(sort).map(map)}</section>

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
  ))
);
