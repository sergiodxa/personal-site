import Head from "next/head";
import Link from "next/link";

import { dark } from "@sergiodxa/palette";
import { H1 } from "@sergiodxa/ui/lib/headings";
import { A } from "@sergiodxa/ui/lib/text";

import Essay from "../components/essays/essay";
import Header from "../components/header";
import Layout from "../layouts/main";

import essays from "../data/essays";

const byDate = (a, b) => {
  const timeA = new Date(a.date).getTime();
  const timeB = new Date(b.date).getTime();

  if (timeA > timeB) return -1;
  if (timeA < timeB) return 1;
  return 0;
};
const toComponent = essay => <Essay key={essay.link} {...essay} />;

function EssaysPage() {
  return (
    <Layout>
      <Head>
        <title>Essays and Articles by Sergio Xalambrí</title>
      </Head>

      <section>
        <Link href="/">
          <A href="/" color={dark}>
            <H1>Essays and Articles</H1>
          </A>
        </Link>
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
  );
}

export default EssaysPage;
