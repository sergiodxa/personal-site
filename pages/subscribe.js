import Head from "next/head";
import Link from "next/link";

import { primary } from "@sergiodxa/palette";

import Layout from "../layouts/main";

import Header from "../components/header";
import SubscribeForm from "../components/subscribe-form";

function SubscribePage() {
  return (
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
  );
}

export default SubscribePage;
