import { Component } from "react";
import Head from "next/head";
import PropTypes from "prop-types";

import { dark, light } from "@sergiodxa/palette";

import TwitterCard from "../components/twitter-card.js";
import OpenGraph from "../components/open-graph.js";

import minify from "../lib/minify.js";

class MainLayout extends Component {
  static propTypes = {
    children: PropTypes.node.isRequired,
    noSchema: PropTypes.bool
  };
  render() {
    const { noSchema, children } = this.props;
    return (
      <main>
        <Head>
          <title>Sergio Xalambrí - Lead Support Engineer</title>
          <meta httpEquiv="Content-Type" content="text/html; charset=utf-8" />
          <meta
            name="viewport"
            content="width=device-width, initial-scale=1.0"
          />
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
            font-family: -apple-system, BlinkMacSystemFont, Segoe UI, Roboto,
              Oxygen, Ubuntu, Cantarell, Fira Sans, Droid Sans, Helvetica Neue,
              sans-serif;
            margin: 0;
            font-size: 1rem;
            font-weight: 200;
          }
          ::selection {
            background-color: ${dark};
            color: ${light};
          }
        `}</style>
      </main>
    );
  }
}

export default MainLayout;
