import Head from 'next/head';
import Link from 'next/link';
import Markdown from '@platzi/react-markdown';
import { distanceInWordsToNow } from 'date-fns';
import slugify from 'slugify';

import Header from '../header.js';
import Layout from '../layout.js';

import withGA from '../../lib/with-ga.js';
import withSW from '../../lib/with-sw.js';

export default withGA(
  withSW(({ title, content, date, slug, description }) => (
    <Layout>
      <Head>
        <title>{title}</title>
        <meta name="description" content={description} />
        {/* Twitter card */}
        <meta name="twitter:title" value={title} />
        <meta
          name="twitter:url"
          value={`https://sergio.now.sh/essays/${slug ||
            slugify(title, { lower: true })}`}
        />
        <meta name="twitter:description" value={description} />
        {/* OpenGraph */}
        <meta property="og:title" content={title} />
        <meta property="og:description" content={description} />
        <meta
          property="og:url"
          content={`https://sergio.now.sh/essays/${slug ||
            slugify(title, { lower: true })}`}
        />
      </Head>

      <Link href="/" prefetch>
        <a title="Sergio Xalambrí">
          <Header sticky={false} />
        </a>
      </Link>

      {/* <time>{distanceInWordsToNow(date)} ago</time> */}

      <Markdown tagName="section" content={content} />

      <style jsx>{`
        a {
          color: black;
          text-decoration: none;
        }
      `}</style>

      <style jsx global>{`
        section {
          outline: 0;
          word-break: break-word;
          word-wrap: break-word;
          max-width: 740px;
          padding-left: 20px;
          padding-right: 20px;
          width: 100%;
          margin: 0 auto;
          box-sizing: border-box;
        }

        h2,
        h3 {
          font-weight: bold;
        }

        h2 {
          font-size: 2.5em;
          letter-spacing: -0.028em;
          margin: 0;
        }

        h3 {
          font-size: 2em;
          letter-spacing: -0.02em;
          margin: 0;
          margin-left: -2px;
          margin-top: 3.5rem;
        }

        section a {
          color: black;
        }

        blockquote {
          border-left: 3px solid rgba(0, 0, 0, 0.84);
          padding-left: 20px;
          margin-left: -23px;
          padding-bottom: 2px;
          --x-height-multiplier: 0.35;
          --baseline-multiplier: 0.179;
          letter-spacing: 0.01rem;
          font-weight: 400;
          font-style: italic;
          font-size: 1.3rem;
          line-height: 1.58;
          letter-spacing: -0.003em;
        }

        blockquote > p {
          margin: 0;
        }

        p {
          font-weight: lighter;
          margin: 1em 0;
          --x-height-multiplier: 0.35;
          --baseline-multiplier: 0.179;
          letter-spacing: 0.01rem;
          font-weight: 400;
          font-style: normal;
          font-size: 1.3em;
          line-height: 1.58;
          letter-spacing: -0.003em;
        }

        @media (max-width: 767px) {
          h2 {
            font-size: 2rem;
            margin-left: -2px;
            line-height: 1.04;
            letter-spacing: -0.028em;
          }

          h3 {
            font-size: 1.75rem;
            margin-top: 1.75rem;
          }

          blockquote {
            font-size: 1.125rem;
            line-height: 1.58;
            letter-spacing: -0.004em;
            padding-left: 17px;
            margin-left: -20px;
          }

          p {
            font-size: 1.125rem;
            line-height: 1.58;
            letter-spacing: -0.004em;
          }
        }
      `}</style>
    </Layout>
  ))
);
