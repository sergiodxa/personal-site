import Head from 'next/head';
import Link from 'next/link';

import { H1 } from '../components/ui/heading';
import Essay from '../components/essays/essay';
import Header from '../components/header';
import Layout from '../layouts/main';

import essays from '../data/essays';

import compose from 'recompose/compose';

import withError from '../lib/with-error';
import withGA from '../lib/with-ga';
import withSW from '../lib/with-sw';
import * as colors from '../lib/colors';

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
        <Header secondary />
      </a>
    </Link>

    <section>
      <H1>Essays and Articles</H1>
      {essays.sort(byDate).map(toComponent)}
    </section>

    <style jsx global>{`
      main {
        margin-bottom: 2em;
      }
    `}</style>
    <style jsx>{`
      a {
        color: ${colors.black};
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
