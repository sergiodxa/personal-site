import Head from 'next/head';
import Link from 'next/link';
import slugify from 'slugify';

import Header from '../components/header.js';
import OpenGraph from '../components/open-graph.js';
import TwitterCard from '../components/twitter-card.js';

import Main from './main.js';

import parser from '../lib/md-parser.js';

export default ({ title, content, date, slug, description }) => (
  <Main>
    <Head>
      <title>{title}</title>
      <meta name="description" content={description} />
    </Head>

    <TwitterCard
      title={title}
      url={`https://sergio.now.sh/essays/${slug ||
        slugify(title, { lower: true })}`}
      description={description}
    />

    <OpenGraph
      title={title}
      description={description}
      url={`https://sergio.now.sh/essays/${slug ||
        slugify(title, { lower: true })}`}
    />

    <Link href="/" prefetch>
      <a title="Sergio Xalambrí">
        <Header sticky={false} />
      </a>
    </Link>

    <section className="content">
      <article
        dangerouslySetInnerHTML={{
          __html: parser(content)
        }}
      />
    </section>

    <style jsx>{`
      a {
        color: black;
        text-decoration: none;
      }

      .content {
        margin-bottom: 10vh;
      }

      .content :global(*:not(iframe):empty) {
        display: none;
      }

      .content :global(article) {
        outline: 0;
        word-break: break-word;
        word-wrap: break-word;
        max-width: 740px;
        padding-left: 1.25rem;
        padding-right: 1.25rem;
        width: 100%;
        margin: 0 auto;
        box-sizing: border-box;
      }
      .content :global(h2),
      .content :global(h3),
      .content :global(h4),
      .content :global(h5),
      .content :global(h6) {
        font-weight: bold;
      }

      .content :global(h2) {
        font-size: 2.5em;
        letter-spacing: -0.028em;
        margin: 0;
      }

      .content :global(h3) {
        font-size: 2em;
        letter-spacing: -0.02em;
        margin: 0;
        margin-left: -2px;
        margin-top: 3.5rem;
      }

      .content :global(a) {
        color: black;
      }

      .content :global(blockquote) {
        border-left: 3px solid rgba(0, 0, 0, 0.84);
        box-sizing: border-box;
        padding-left: calc(2rem - 3px);
        margin-left: -2rem;
        padding-bottom: 2px;
        letter-spacing: 0.01rem;
        font-weight: 400;
        font-style: italic;
        font-size: 1.3rem;
        line-height: 1.58;
        letter-spacing: -0.003em;
      }

      .content :global(blockquote > p) {
        margin: 0;
      }

      .content :global(p) {
        font-weight: lighter;
        margin: 1rem 0;
        letter-spacing: 0.01rem;
        font-weight: 400;
        font-style: normal;
        font-size: 1.3em;
        line-height: 1.58;
        letter-spacing: -0.003em;
      }

      /* inline code */
      .content :global(p code) {
        color: #f81ce5;
        font-family: Menlo, Monaco, Lucida Console, Liberation Mono,
          DejaVu Sans Mono, Bitstream Vera Sans Mono, Courier New, monospace,
          serif;
        font-size: 0.8em;
        white-space: pre-wrap;
      }

      .content :global(p code:before) {
        content: '\`';
      }

      .content :global(p code:after) {
        content: '\`';
      }

      /* code blocks */
      .content :global(pre) {
        border: 1px solid black;
        padding: 1rem calc(2rem - 1px);
        margin: 1rem -2rem;
        overflow: scroll;
      }

      .content :global(pre code) {
        color: black;
        font-family: Menlo, Monaco, Lucida Console, Liberation Mono,
          DejaVu Sans Mono, Bitstream Vera Sans Mono, Courier New, monospace,
          serif;
        font-size: 1rem;
      }

      /* identation sizes */
      .content :global(pre code[class~="language-javascript"]),
      .content :global(pre code[class~="language-js"]),
      .content :global(pre code[class~="language-html"]),
      .content :global(pre code[class~="language-css"]),
      .content :global(pre code[class~="language-styl"]),
      .content :global(pre code[class~="language-saas"]),
      .content :global(pre code[class~="language-less"]),
      .content :global(pre code[class~="language-ruby"] ){
        tab-size: 2;
      }
      .content :global(pre code[class~="language-java"]),
      .content :global(pre code[class~="language-python"]),
      .content :global(pre code[class~="language-php"]) {
        tab-size: 4;
      }
      .content :global(pre code[class~="language-go"]) {
        tab-size: 8;
      }

      /* table */
      .content :global(table) {
        font-size: 0.9rem;
        width: 100%;
      }

      .content :global(th) {
        padding: 5px;
        color: #9b9b9b;
        font-style: oblique;
        font-weight: normal;
        text-align: left;
      }

      .content :global(td) {
        padding: 5px;
      }

      .content :global(mark) {
        background-color: #f81ce5;
        color: white;
        padding: 0.125em 0.2em;
      }

      /* lists */
      .content :global(ul),
      .content :global(ol) {
        font-size: 1.3em;
        font-weight: normal;
        margin-left: -2rem;
        padding-left: 2rem;
      }

      .content :global(ul) {
        list-style-type: square;
      }

      .content :global(ol) {
        list-style-type: lower-roman;
      }

      .content :global(li) {
        line-height: 1.5;
      }

      .content :global(abbr) {
        cursor: help;
        text-decoration-style: dashed;
      }

      .content :global(figure) {
        text-align: center;
        width: 100%;
      }

      .content :global(img) {
        max-width: 100%;
      }

      .content :global(dt) {
        font-weight: bold;
      }

      .content :global(.embed-responsive) {
        position: relative;
        padding-bottom: 56.25% /* 16:9 */;
        height: 0;
        margin: 0 -2rem;
      }

      .content :global(.embed-responsive-item) {
        position: absolute !important;
        top: 0 !important;
        left: 0 !important;
        width: 100% !important;
        height: 100% !important;
      }

      /* pink */
      .content :global(.hljs-keyword),
      .content :global(.hljs-selector-tag),
      .content :global(.hljs-literal),
      .content :global(.hljs-strong),
      .content :global(.hljs-attribute),
      .content :global(.hljs-symbol),
      .content :global(.hljs-link) {
        color: #f81ce5;
      }
      /* red */
      .content :global(.hljs-code),
      .content :global(.hljs-deletion),
      .content :global(.hljs-name) {
        color: #ff5f56;
      }
      /* green */
      .content :global(.hljs-bullet),
      .content :global(.hljs-subst),
      .content :global(.hljs-title),
      .content :global(.hljs-section),
      .content :global(.hljs-emphasis),
      .content :global(.hljs-type),
      .content :global(.hljs-built_in),
      .content :global(.hljs-builtin-name),
      .content :global(.hljs-selector-attr),
      .content :global(.hljs-selector-pseudo),
      .content :global(.hljs-addition),
      .content :global(.hljs-variable),
      .content :global(.hljs-template-tag),
      .content :global(.hljs-template-variable),
      .content :global(.hljs-function),
      .content :global(.hljs-attr) {
        color: #27c93f;
      }
      /* yellow */
      .content :global(.hljs-string),
      .content :global(.hljs-regexp) {
        color: #FFBD2F;
      }
      /* cyan */
      .content :global(.hljs-attribute) {
        color: #067df7;
      }
      /* grey */
      .content :global(.hljs-comment),
      .content :global(.hljs-quote),
      .content :global(.hljs-meta) {
        color: #9b9b9b;
      }
      /* black */
      .content :global(.hljs-params),
      .content :global(.hljs-tag) {
        color: black;
      }
      /* bold */
      .content :global(.hljs-keyword),
      .content :global(.hljs-selector-tag),
      .content :global(.hljs-literal),
      .content :global(.hljs-doctag),
      .content :global(.hljs-title),
      .content :global(.hljs-section),
      .content :global(.hljs-type),
      .content :global(.hljs-selector-id) {
        font-weight: bold;
      }

      @media (max-width: 767px) {
        .content :global(h2) {
          font-size: 2rem;
          margin-left: -2px;
          line-height: 1.04;
          letter-spacing: -0.028em;
        }

        .content :global(h3) {
          font-size: 1.75rem;
          margin-top: 1.75rem;
        }

        .content :global(blockquote) {
          font-size: 1.125rem;
          line-height: 1.58;
          letter-spacing: -0.004em;
          padding-left: 17px;
          margin-left: -20px;
        }

        .content :global(p) {
          font-size: 1.125rem;
          line-height: 1.58;
          letter-spacing: -0.004em;
        }

        .content :global(pre) {
          border-left: none;
          border-right: none;
          padding: 1rem 1.25rem;
          margin: 1rem -1.25rem;
        }

        .content :global(ul),
        .content :global(ol) {
          margin-left: 0;
          padding-left: 2rem;
        }

        .content :global(.embed-responsive) {
          margin: 0 -1.25rem;
        }
      }
    `}</style>
  </Main>
);
