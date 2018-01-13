import Head from "next/head";
import Link from "next/link";

import Layout from "../layouts/main";

import Header from "../components/header";
import { A } from "../components/ui/text";
import { H1 } from "../components/ui/heading";
import SubscribeForm from "../components/subscribe-form";

import compose from "recompose/compose";

import withGA from "../lib/hoc/with-ga";
import withSW from "../lib/hoc/with-sw";
import withError from "../lib/hoc/with-error";
import * as colors from "../lib/colors";

export default compose(withError, withGA, withSW)(() => (
  <Layout>
    <Head>
      <title>Subscribe to Sergio Xalambrí's essays</title>
    </Head>

    <Link href="/" prefetch>
      <a title="Sergio Xalambrí">
        <Header secondary />
      </a>
    </Link>

    <section>
      <div>
        <SubscribeForm />
      </div>
    </section>

    <style jsx>{`
      section {
        max-width: 720px;
        margin: -2em auto 0;
        font-size: 1.4em;
        height: calc(100vh - 79px);
        display: flex;
        flex-direction: column;
        justify-content: center;
      }

      a {
        color: ${colors.black};
        text-decoration: none;
      }
    `}</style>
  </Layout>
));
