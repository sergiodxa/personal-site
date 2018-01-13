import Head from "next/head";
import Link from "next/link";

import { H1 } from "../components/ui/heading";
import Essay from "../components/essays/essay";
import Header from "../components/header";
import Layout from "../layouts/main";

import essays from "../data/essays";

import compose from "recompose/compose";

import withError from "../lib/hoc/with-error";
import withGA from "../lib/hoc/with-ga";
import withSW from "../lib/hoc/with-sw";
import * as colors from "../lib/colors";

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
      section {
        margin: 0.5em;
      }

      @media (min-width: 720px) {
        section {
          margin: 1em;
        }
      }
    `}</style>
  </Layout>
));
