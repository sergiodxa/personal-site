import Head from "next/head";
import Link from "next/link";

import compose from "recompose/compose";

import { LinkedHeader } from "../components/header";
import Icon from "../components/icon";
import Layout from "../layouts/main";

import withGA from "../lib/hoc/with-ga";
import withSW from "../lib/hoc/with-sw";
import withError from "../lib/hoc/with-error";
import * as colors from "../lib/colors";

export default compose(withError, withGA, withSW)(() => (
  <Layout>
    <Head>
      <title>About Sergio Xalambrí</title>
    </Head>

    <LinkedHeader />

    <section id="about">
      <section id="bio" className="h-card">
        <article>
          <p className="p-note">
            I'm <strong className="p-name">Sergio Xalambrí</strong>,{" "}
            <em>Software Developer</em> currently working as{" "}
            <span className="p-job-title">Lead Support Engineer</span> at{" "}
            <strong className="p-org h-card">▲ZEIT</strong>
          </p>
        </article>
      </section>

      <section id="social">
        <ul>
          <li>
            <a
              href="https://sdx.im/twitter"
              rel="me"
              title="Twitter"
              className="u-url"
            >
              <Icon name="Twitter" />
            </a>
          </li>
          <li>
            <a
              href="https://sdx.im/medium"
              rel="me"
              title="Medium"
              className="u-url"
            >
              <Icon name="Medium" />
            </a>
          </li>
          <li>
            <a
              href="https://sdx.im/gh"
              rel="me"
              title="GitHub"
              className="u-url"
            >
              <Icon name="GitHub" />
            </a>
          </li>
          <li>
            <a href="https://sdx.im/npm" rel="me" title="npm" className="u-url">
              <Icon name="npm" />
            </a>
          </li>
          <li>
            <a
              href="https://sdx.im/cv"
              rel="me"
              title="LinkedIn"
              className="u-url"
            >
              <Icon name="LinkedIn" />
            </a>
          </li>
          <li>
            <a
              href="https://sdx.im/instagram"
              rel="me"
              title="Instagram"
              className="u-url"
            >
              <Icon name="Instagram" />
            </a>
          </li>
          <li>
            <a
              href="https://sdx.im/steam"
              rel="me"
              title="Steam"
              className="u-url"
            >
              <Icon name="Steam" />
            </a>
          </li>
          <li>
            <a
              href="https://sdx.im/yt"
              rel="me"
              title="YouTube"
              className="u-url"
            >
              <Icon name="YouTube" />
            </a>
          </li>
          <li>
            <a
              href="https://sdx.im/meetup"
              rel="me"
              title="Meetup"
              className="u-url"
            >
              <Icon name="Meetup" />
            </a>
          </li>
          <li>
            <a
              href="https://sdx.im/codepen"
              rel="me"
              title="Codepen"
              className="u-url"
            >
              <Icon name="codepen" />
            </a>
          </li>
          <li>
            <a href="/atom" rel="me" title="Feed RSS" className="u-url">
              <Icon name="RSS" />
            </a>
          </li>
          <li>
            <a
              href="mailto:hello@sergiodxa.com"
              rel="me"
              title="Email"
              className="u-email"
            >
              <Icon name="Email" />
            </a>
          </li>
        </ul>
      </section>
    </section>

    <style jsx>{`
      section {
        margin: 0 auto;
        max-width: 800px;
      }

      p {
        margin: 0.5em;
      }

      #bio {
        margin: 0 auto;
        font-size: 2em;
        text-align: center;
      }

      #bio > p {
        margin: 0;
      }

      #social > ul {
        display: flex;
        list-style-type: none;
        padding-left: 0;
        font-size: 1.5em;
        justify-content: center;
        flex-wrap: wrap;
      }

      #social > ul > li > a {
        color: ${colors.black};
        text-decoration: none;
        margin: 0.5em;
        display: block;
      }

      #about {
        min-height: calc(100vh - 72px);
        display: flex;
        flex-direction: column;
        justify-content: center;
      }

      @media (min-width: 720px) {
        #bio {
          font-size: 3em;
        }
      }
    `}</style>
  </Layout>
));
