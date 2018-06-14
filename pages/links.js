import Head from "next/head";

import { dark } from "@sergiodxa/palette";
import { A } from "@sergiodxa/ui/lib/text";
import { DL, DD, DT } from "@sergiodxa/ui/lib/list";

import { LinkedHeader } from "../components/header";
import Layout from "../layouts/main";

import Twitter from "@sergiodxa/icons/lib/twitter";

import links from "../data/links.json";

function formatTweet({ url, title, comment }) {
  return `https://twitter.com/intent/tweet?text=https://sdx.im/link/${url}?source=twitter -> ${title}, ${comment}`;
}

function LinksPage() {
  return (
    <Layout>
      <Head>
        <title>Links</title>
      </Head>

      <LinkedHeader />

      <section>
        {links.map(({ url, title, comment }) => (
          <DL key={url}>
            <DT>
              <A color={dark} href={`https://sdx.im/link/${url}`}>
                {title}
              </A>
            </DT>
            <br />
            <DD>{comment}</DD>
            <div>
              <A color={dark} href={formatTweet({ url, title, comment })}>
                Tweet it! <Twitter />
              </A>
            </div>
          </DL>
        ))}
      </section>

      <style jsx>{`
        section {
          margin: 0 auto;
          max-width: 720px;
        }

        div {
          padding-top: 1em;
          text-align: right;
        }

        section :global(svg) {
          vertical-align: bottom;
          height: 1em;
          width: 1em;
        }
      `}</style>
    </Layout>
  );
}

export default LinksPage;
