import Head from "next/head";
import Link from "next/link";

import withAnalytics from "@sergiodxa/analytics/lib/react";

import Header from "../components/header";
import Navigation from "../components/navigation";
import Layout from "../layouts/main";

import compose from "recompose/compose";
import withSW from "../lib/hoc/with-sw";
import withError from "../lib/hoc/with-error";

export default compose(withError, withAnalytics, withSW)(() => (
  <Layout>
    <Head>
      <title>Sergio Xalambrí</title>
    </Head>

    <Header centered />

    <Navigation />
  </Layout>
));
