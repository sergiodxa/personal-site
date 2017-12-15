import Head from 'next/head';
import Link from 'next/link';

import compose from 'recompose/compose';

import Header from '../components/header.js';
import Icon from '../components/icon.js';
import Layout from '../layouts/main.js';

import withGA from '../lib/with-ga.js';
import withSW from '../lib/with-sw.js';
import withError from '../lib/with-error.js';
import * as colors from '../lib/colors.js';

export default compose(withError, withGA, withSW)(() => (
  <Layout>
    <Head>
      <title>About Sergio Xalambrí</title>
    </Head>

    <Link href="/" prefetch>
      <a title="Sergio Xalambrí">
        <Header />
      </a>
    </Link>

    <section id="about">
      <section id="bio" className="h-card">
        <article>
          <p>
            I'm <strong className="p-name">Sergio Xalambrí</strong>,{' '}
            <em>JavaScript and Frontend developer</em> currently working as{' '}
            <span className="p-job-title">Lead Support Engineer</span> at{' '}
            <strong className="p-org h-card">▲ZEIT</strong>
          </p>
        </article>
      </section>

      <section id="social">
        <ul>
          <li>
            <Link href="/essays">
              <a rel="me" title="Essays">
                <Icon name="Essays" />
              </a>
            </Link>
          </li>
          <li>
            <a href="https://twitter.com/@sergiodxa" rel="me" title="Twitter">
              <Icon name="Twitter" />
            </a>
          </li>
          <li>
            <a href="https://medium.com/@sergiodxa" rel="me" title="Medium">
              <Icon name="Medium" />
            </a>
          </li>
          <li>
            <a href="https://github.com/sergiodxa" rel="me" title="GitHub">
              <Icon name="GitHub" />
            </a>
          </li>
          <li>
            <a href="https://www.npmjs.com/~sergiodxa" rel="me" title="npm">
              <Icon name="npm" />
            </a>
          </li>
          <li>
            <a
              href="https://www.linkedin.com/in/sergiodxa"
              rel="me"
              title="LinkedIn"
            >
              <Icon name="LinkedIn" />
            </a>
          </li>
          <li>
            <a
              href="https://www.instagram.com/sergiodxa/"
              rel="me"
              title="Instagram"
            >
              <Icon name="Instagram" />
            </a>
          </li>
          <li>
            <a
              href="https://steamcommunity.com/id/sergiodxa/"
              rel="me"
              title="Steam"
            >
              <Icon name="Steam" />
            </a>
          </li>
          <li>
            <a
              href="https://www.youtube.com/channel/UCot5kKrWMufGtRohOli6T6g"
              rel="me"
              title="YouTube"
            >
              <Icon name="YouTube" />
            </a>
          </li>
          <li>
            <a
              href="https://www.meetup.com/members/182915204/"
              rel="me"
              title="Meetup"
            >
              <Icon name="Meetup" />
            </a>
          </li>
          <li>
            <a href="mailto:sergiodxa@gmail.com" rel="me" title="Email">
              <Icon name="Email" />
            </a>
          </li>
        </ul>
      </section>
    </section>

    <style jsx>{`
      a {
        color: ${colors.black};
        text-decoration: none;
      }

      section {
        margin: 0 auto;
        max-width: 800px;
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
        height: calc(100vh - 72px);
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
