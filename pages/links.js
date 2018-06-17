import Head from "next/head";

import { dark, red, blue } from "@sergiodxa/palette";
import { A, BlockQuote } from "@sergiodxa/ui/lib/text";
import { H1 } from "@sergiodxa/ui/lib/headings";
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
        <title>Sergio Xalambrí - Shared Links</title>
        <link
          href="/links/atom"
          type="application/atom+xml"
          rel="alternate"
          title="Sergio Xalambrí - Shared Links"
        />
      </Head>

      <LinkedHeader />

      <section>
        <H1>Shared Links</H1>

        <BlockQuote>
          Subscribe to shared links{" "}
          <A href="/links/atom" color={red} decoration="underline">
            RSS feed
          </A>{" "}
          or{" "}
          <A
            href="https://twitter.com/sergiodxa"
            color={blue}
            decoration="underline"
          >
            follow me on Twitter
          </A>{" "}
          to get new links periodically!
        </BlockQuote>

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
          margin: 0 20px;
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

        article {
          margin-bottom: 2em;
        }

        @media (min-width: 720px) {
          section {
            margin: 0 auto;
          }
        }
      `}</style>
    </Layout>
  );
}

export default LinksPage;
