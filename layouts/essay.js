import Head from 'next/head';
import Link from 'next/link';
import slugify from 'slugify';
import format from 'date-fns/format';
import isValid from 'date-fns/is_valid';
import compose from 'recompose/compose';
import mapProps from 'recompose/mapProps';
import setPropTypes from 'recompose/setPropTypes';
import setDisplayName from 'recompose/setDisplayName';
import PropTypes from 'prop-types';

import { H1 } from '../components/ui/heading';

import Header from '../components/header';
import OpenGraph from '../components/open-graph';
import TwitterCard from '../components/twitter-card';
import SubscribeForm from '../components/subscribe-form';

import Main from './main';

import parser from '../lib/markdown';
import * as colors from '../lib/colors';
import * as CustomTypes from '../lib/types';
import parseUrl from '../lib/parse-url';

const abbreviatures = `
*[ipc]: Inter-process communication
*[IPC]: Inter-process communication
*[GQL]: GraphQL
*[HTML]: HyperText Markup Language
*[CSS]: Cascading Style Sheets
*[JS]: JavaScript
*[HTTP]: Hypertext Transfer Protocol
*[UI]: User interface
*[UX]: User eXperience
*[DX]: Developer eXperience
*[API]: Application programming interface
*[E2E]: End-to-End
*[e2e]: End-to-End
*[IDE]: Integrated development environment
*[REST]: Representational state transfer
*[SQL]: Structured Query Language
*[DB]: Database
`;

export default compose(
  mapProps(({ date, content, tags = '', ...props }) => ({
    ...props,
    date: new Date(date),
    dateString: date,
    content: parser(abbreviatures + content),
    tags: tags.split(', '),
    hostname: props.canonicalUrl ? parseUrl(props.canonicalUrl).hostname : ''
  })),
  setDisplayName('Essay'),
  setPropTypes({
    title: PropTypes.string.isRequired,
    content: PropTypes.array.isRequired,
    dateString: PropTypes.string.isRequired,
    date: PropTypes.instanceOf(Date),
    slug: PropTypes.string,
    description: CustomTypes.stringMax140,
    canonicalUrl: PropTypes.string,
    tags: PropTypes.arrayOf(PropTypes.string),
    hostname: PropTypes.string
  })
)(props => (
  <Main>
    <Head>
      <title>{props.title}</title>
      <meta name="description" content={props.description} />
      <meta name="twitter:widgets:theme" content="light" />
      <meta name="twitter:widgets:link-color" content={colors.blue} />
      <meta name="twitter:widgets:border-color" content={colors.blue} />
      {props.canonicalUrl && <link rel="canonical" href={props.canonicalUrl} />}
    </Head>

    <TwitterCard
      title={props.title}
      url={`https://sergiodxa.com/essays/${props.slug ||
        slugify(title, { lower: true })}/`}
      description={props.description}
    />

    <OpenGraph
      title={props.title}
      description={props.description}
      url={`https://sergiodxa.com/essays/${props.slug ||
        slugify(title, { lower: true })}/`}
    />

    <Link href="/essays" prefetch>
      <a title="Sergio Xalambrí" rel="home">
        <Header sticky={false} secondary />
      </a>
    </Link>

    <a href="https://github.com/sergiodxa/personal-site" className="src">
      {'<source />'}
    </a>

    <section className="content">
      <H1 className="main-title">{props.title}</H1>
      {isValid(props.date) && (
        <time className="publishedAt" dateTime={props.dateString}>
          Posted on <b>{format(props.date, 'MMMM DD, YYYY')}</b>
        </time>
      )}

      {props.canonicalUrl && (
        <div className="canonicalUrl">
          Originally published at{' '}
          <a href={props.canonicalUrl} target="_blank" rel="canonical">
            {props.hostname}
          </a>
        </div>
      )}

      <article>{props.content}</article>

      <SubscribeForm />
    </section>

    <style jsx>{`
      a {
        color: ${colors.black};
        text-decoration: none;
      }

      .src {
        position: absolute;
        top: 0;
        right: 0;
        padding: 1.5rem 3em;
      }
      .src:hover {
        text-decoration: underline;
      }

      .content {
        font-size: 1.25rem;
        margin: 0 auto 10vh;
        max-width: 36em;
        width: 100%;
      }

      .content :global(.main-title) {
        text-align: center;
        padding-left: 0.5em;
        padding-right: 0.5em;
      }

      .publishedAt {
        display: block;
        text-align: right;
      }

      .canonicalUrl {
        border: 1px solid ${colors.grey};
        padding: 0.75em;
        margin: 0.75em;
      }

      .content article {
        box-sizing: border-box;
        font-weight: normal;
        line-height: 1.4;
        outline: 0;
        padding-left: 1em;
        padding-right: 1em;
        word-break: break-word;
        word-wrap: break-word;
      }
      .content :global(h2),
      .content :global(h3),
      .content :global(h4),
      .content :global(h5),
      .content :global(h6) {
        font-weight: lighter;
        letter-spacing: -0.02em;
        margin: 1em 0 0;
        position: relative;
      }

      .content :global(h2:hover > .anchor::before) {
        margin-right: -1em;
      }

      .content :global(*:hover > .anchor::before) {
        content: '#';
        color: ${colors.black};
        text-decoration: none;
        position: absolute;
        right: 100%;
        padding: 0 0.25em;
      }

      .content :global(h2) {
        border-bottom: 1px solid ${colors.black};
        box-sizing: border-box;
        margin-left: calc(-1em + 2px);
        margin-right: calc(-1em + 2px);
        padding: 0 1em 0.25em;
      }

      .content :global(hr) {
        margin: 2em auto;
        width: 33%;
      }

      /* identation sizes */
      // .content :global(pre code[class~='language-javascript']),
      // .content :global(pre code[class~='language-js']),
      // .content :global(pre code[class~='language-html']),
      // .content :global(pre code[class~='language-css']),
      // .content :global(pre code[class~='language-styl']),
      // .content :global(pre code[class~='language-saas']),
      // .content :global(pre code[class~='language-less']),
      // .content :global(pre code[class~='language-ruby']) {
      //   tab-size: 2;
      // }
      // .content :global(pre code[class~='language-java']),
      // .content :global(pre code[class~='language-python']),
      // .content :global(pre code[class~='language-php']) {
      //   tab-size: 4;
      // }
      // .content :global(pre code[class~='language-go']) {
      //   tab-size: 8;
      // }

      /* videos */
      .content :global(.embed-responsive) {
        position: relative;
        padding-bottom: 56.25%;
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
        color: ${colors.pink};
      }
      /* red */
      .content :global(.hljs-code),
      .content :global(.hljs-deletion),
      .content :global(.hljs-name) {
        color: ${colors.red};
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
        color: ${colors.green};
      }
      /* yellow */
      .content :global(.hljs-string),
      .content :global(.hljs-regexp) {
        color: ${colors.yellow};
      }
      /* blue */
      .content :global(.hljs-attribute) {
        color: ${colors.blue};
      }
      /* grey */
      .content :global(.hljs-comment),
      .content :global(.hljs-quote),
      .content :global(.hljs-meta) {
        color: ${colors.grey};
      }
      /* black */
      .content :global(.hljs-params),
      .content :global(.hljs-tag) {
        color: ${colors.black};
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
        .src {
          display: none;
        }

        .publishedAt {
          padding-right: 1em;
          padding-left: 1em;
        }

        .main-title {
          font-size: 2em;
          margin-left: -2px;
          line-height: 1.04;
          letter-spacing: -0.028em;
          text-align: left;
        }

        .content :global(*:hover > .anchor::before) {
          display: none;
        }

        .content :global(h2) {
          font-size: 1.75em;
          margin-top: 1.75rem;
          box-sizing: border-box;
          padding-left: 0.5714285714em;
          padding-right: 0.5714285714em;
          margin-left: -0.5714285714em;
          margin-right: -0.5714285714em;
        }

        .content :global(h3) {
          font-size: 1.5em;
        }

        .content :global(h4) {
          font-size: 1.25em;
        }

        .content :global(h5) {
          font-size: 1.125em;
        }

        .content :global(h6) {
          font-size: 1em;
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
));
