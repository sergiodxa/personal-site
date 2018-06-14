import Head from "next/head";

import Header from "../components/header";
import Navigation from "../components/navigation";
import Layout from "../layouts/main";

function HomePage() {
  return (
    <Layout>
      <Head>
        <title>Sergio Xalambrí</title>
      </Head>

      <Header centered />

      <Navigation />
    </Layout>
  );
}

export default HomePage;
