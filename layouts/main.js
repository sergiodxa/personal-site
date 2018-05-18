import Head from "next/head";
import Router from "next/router";
import setDisplayName from "recompose/setDisplayName";
import setPropTypes from "recompose/setPropTypes";
import compose from "recompose/compose";
import PropTypes from "prop-types";
import NProgress from "nprogress";

import {dark, light} from "@sergiodxa/palette";

import Header from "../components/header.js";
import TwitterCard from "../components/twitter-card.js";
import OpenGraph from "../components/open-graph.js";

import minify from "../lib/minify.js";

let progressTimer = null;
Router.onRouteChangeStart = () => {
  progressTimer = setTimeout(NProgress.start, 300);
};
Router.onRouteChangeComplete = () => {
  NProgress.done();
  clearTimeout(progressTimer);
};
Router.onRouteChangeError = () => {
  NProgress.done();
  clearTimeout(progressTimer);
};

export default compose(
  setDisplayName("Main"),
  setPropTypes({
    children: PropTypes.node.isRequired,
    noSchema: PropTypes.bool
  })
)(({ children, noSchema }) => (
  <main>
    <Head>
      <title>Sergio Xalambrí - Lead Support Engineer</title>
      <meta httpEquiv="Content-Type" content="text/html; charset=utf-8" />
      <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      <meta name="description" content="Lead Support Engineer at ▲ZEIT" />
      <meta name="language" content="en" />
      <meta name="author" content="Sergio Xalambrí" />
      <meta name="subject" content="Personal website" />
      <meta name="pagename" content="Sergio Xalambrí" />
      <meta name="HandheldFriendly" content="True" />
      <meta name="MobileOptimized" content="320" />
      <meta name="robots" content="index, follow" />
      <meta name="theme-color" content={dark} />

      <link
        href="/atom"
        type="application/atom+xml"
        rel="alternate"
        title="Sergio Xalambrí"
      />
      <link rel="manifest" href="/static/manifest.json" />
      <link rel="shortcut icon" href="/static/favicon@128.jpg" />

      <meta name="apple-mobile-web-app-title" content="Sergio Xalambrí" />
      <meta content="IE=edge,chrome=1" httpEquiv="X-UA-Compatible" />

      {/* Google WebMaster Tools Verification */}
      <meta
        name="google-site-verification"
        content="9AkcEK4Ofz3GhKILelFPvJALYzt8KfvX8SqVyqeSL90"
      />

      {/* Schema JSON */}
      {!noSchema && (
        <script
          id="schema"
          key="schema"
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: minify(
              JSON.stringify({
                "@context": "http://schema.org",
                "@type": "Person",
                name: "Sergio Xalambrí",
                image: "https://sergiodxa.com/static/avatar.jpg",
                birthDate: "1992-09-29",
                email: "hello@sergiodxa.com",
                gender: "Male",
                givenName: "Sergio",
                familyName: "Xalambrí",
                jobTitle: "Lead Support Engineer",
                worksFor: {
                  name: "ZEIT"
                }
              })
            )
          }}
        />
      )}
    </Head>

    <TwitterCard />

    <OpenGraph />

    {children}

    {/* Basic styles */}
    <style jsx global>{`
      body {
        font-family: -apple-system, BlinkMacSystemFont, Segoe UI, Roboto, Oxygen,
          Ubuntu, Cantarell, Fira Sans, Droid Sans, Helvetica Neue, sans-serif;
        margin: 0;
        font-size: 1rem;
        font-weight: 200;
      }
      ::selection {
        background-color: ${dark};
        color: ${light};
      }

      :root {
        --color: ${dark};
      }

      a:active {
        background: url("https://analytics.sergiodxa.com?action=link-clicked");
      }
      a:hover {
        background: url("https://analytics.sergiodxa.com?action=link-hovered");
      }

      #nprogress {
        pointer-events: none;
      }
      #nprogress .bar {
        background: var(--color);
        position: fixed;
        z-index: 1031;
        top: 0;
        left: 0;
        width: 100%;
        height: 2px;
      }
      #nprogress .peg {
        display: block;
        position: absolute;
        right: 0;
        width: 100px;
        height: 100%;
        box-shadow: 0 0 10px var(--color), 0 0 5px var(--color);
        opacity: 1;
        -webkit-transform: rotate(3deg) translate(0px, -4px);
        -ms-transform: rotate(3deg) translate(0px, -4px);
        transform: rotate(3deg) translate(0px, -4px);
      }
      #nprogress .spinner {
        display: block;
        position: fixed;
        z-index: 1031;
        top: 15px;
        right: 15px;
      }
      #nprogress .spinner-icon {
        width: 18px;
        height: 18px;
        box-sizing: border-box;
        border: solid 2px transparent;
        border-top-color: var(--color);
        border-left-color: var(--color);
        border-radius: 50%;
        animation: nprogress-spinner 400ms linear infinite;
      }
      .nprogress-custom-parent {
        overflow: hidden;
        position: relative;
      }
      .nprogress-custom-parent #nprogress .bar,
      .nprogress-custom-parent #nprogress .spinner {
        position: absolute;
      }
      @keyframes nprogress-spinner {
        0% {
          transform: rotate(0deg);
        }
        100% {
          transform: rotate(360deg);
        }
      }
    `}</style>
  </main>
));
