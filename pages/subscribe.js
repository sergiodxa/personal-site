import Head from "next/head";
import Link from "next/link";

import withAnalytics from "@sergiodxa/analytics/lib/react";
import { primary } from "@sergiodxa/palette";
import { A } from "@sergiodxa/ui/lib/text";
import { H1 } from "@sergiodxa/ui/lib/headings";

import Layout from "../layouts/main";

import Header from "../components/header";
import SubscribeForm from "../components/subscribe-form";

import compose from "recompose/compose";

import withSW from "../lib/hoc/with-sw";
import withError from "../lib/hoc/with-error";

export default compose(
  withError,
  Page => withAnalytics(Page, process.env.NODE_ENV === "production"),
  withSW
)(() => (
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
        color: ${primary};
        text-decoration: none;
      }
    `}</style>
  </Layout>
));
