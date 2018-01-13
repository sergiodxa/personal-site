import Head from "next/head";
import Link from "next/link";

import Header from "../components/header";
import Navigation from "../components/navigation";
import Layout from "../layouts/main";

import compose from "recompose/compose";

import withGA from "../lib/hoc/with-ga";
import withSW from "../lib/hoc/with-sw";
import withError from "../lib/hoc/with-error";
import * as colors from "../lib/colors";

export default compose(withError, withGA, withSW)(() => (
  <Layout>
    <Head>
      <title>Sergio Xalambrí</title>
    </Head>

    <Header centered />

    <Navigation />
  </Layout>
));
