import Head from 'next/head';
import Header from '../components/header.js';

import minify from '../lib/minify.js';

export default ({ children }) => (
  <main>
    <Head>
      <title>Sergio Xalambrí - Lead Support Engineer</title>
      <meta httpEquiv="Content-Type" content="text/html; charset=utf-8" />
      <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      <meta name="description" content="Lead Support Engineer" />
      <meta name="language" content="en" />
      <meta name="author" content="Sergio Xalambrí" />
      <meta name="subject" content="Personal website" />
      <meta name="pagename" content="Sergio Xalambrí" />
      <meta name="HandheldFriendly" content="True" />
      <meta name="MobileOptimized" content="320" />
      <meta name="robots" content="index, follow" />
      <meta name="theme-color" content="#000000" />

      <link rel="manifest" href="/static/manifest.json" />
      <link rel="shortcut icon" href="/static/favicon.ico" />

      <meta name="apple-mobile-web-app-title" content="Sergio Xalambrí" />
      <meta content="IE=edge,chrome=1" httpEquiv="X-UA-Compatible" />

      {/* Google WebMaster Tools Verification */}
      <meta
        name="google-site-verification"
        content="X2JScoEw_7GYGeczFqsSI1Xm5h_z5Vn2PqtwWKnoNuI"
      />

      {/* Twitter Card */}
      <meta name="twitter:card" value="summary" />
      <meta name="twitter:site" value="@sergiodxa" />
      <meta name="twitter:creator" value="@sergiodxa" />
      <meta name="twitter:url" value="https://sergio.now.sh/" />
      <meta name="twitter:title" value="Sergio Xalambrí" />
      <meta name="twitter:description" value="Lead Support Engineer" />
      <meta
        name="twitter:image"
        value="https://sergio.now.sh/static/avatar.jpg"
      />
      <meta
        name="twitter:summary"
        value="Sergio Xalambrí's personal website'"
      />

      {/* OpenGraph */}
      <meta property="og:type" content="website" />
      <meta property="og:title" content="Sergio Xalambrí" />
      <meta property="og:description" content="Lead Support Engineer" />
      <meta
        property="og:image"
        content="https://sergio.now.sh/static/avatar.jpg"
      />
      <meta property="og:url" content="https://sergio.now.sh/" />
      <meta property="og:site_name" content="Sergio Xalambrí" />
      <meta property="og:locale" content="en" />

      {/* Schema JSON */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: minify(
            JSON.stringify({
              '@context': 'http://schema.org',
              '@type': 'Person',
              name: 'Sergio Xalambrí',
              image: 'https://sergio.now.sh/static/avatar.jpg',
              birthDate: '1992-09-29',
              email: 'sergiodxa@gmail.com',
              gender: 'Male',
              givenName: 'Sergio',
              familyName: 'Xalambrí',
              jobTitle: 'Lead Support Engineer',
              worksFor: {
                name: 'ZEIT'
              }
            })
          )
        }}
      />
    </Head>

    {children}

    {/* Basic styles */}
    <style jsx global>{`
      body {
        font-family: -apple-system, BlinkMacSystemFont, Segoe UI, Roboto, Oxygen,
          Ubuntu, Cantarell, Fira Sans, Droid Sans, Helvetica Neue, sans-serif;
        margin: 0;
        font-size: 18px;
        font-weight: 200;
      }
      ::selection {
        background-color: black;
        color: white;
      }
    `}</style>
  </main>
);
