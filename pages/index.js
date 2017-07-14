import Head from 'next/head';

const minify = string => string.replace(/\n\s{0,}/g, '').replace(/\:\s/g, '');

export default () =>
  <main>
    <Head>
      <title>Sergio Xalambrí</title>
      <meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
      <meta
        name="viewport"
        content="width=device-width, initial-scale=1.0, minimum-scale=1.0, maximum-scale=1.0"
      />
      <meta name="description" content="Lead Support Engineer" />
      <meta name="language" content="en" />
      <meta name="author" content="Sergio Xalambrí" />
      <meta name="subject" content="Personal website" />
      <meta name="pagename" content="Sergio Xalambrí" />
      <meta name="HandheldFriendly" content="True" />
      <meta name="MobileOptimized" content="320" />
      <meta name="robots" content="index, follow" />

      <meta name="apple-mobile-web-app-title" content="Sergio Xalambrí" />
      <meta content="IE=edge,chrome=1" http-equiv="X-UA-Compatible" />

      <meta name="twitter:card" value="summary" />
      <meta name="twitter:site" value="@sergiodxa" />
      <meta name="twitter:creator" value="@sergiodxa" />
      <meta name="twitter:url" value="https://sergio.xalambri.xyz/" />
      <meta name="twitter:title" value="Sergio Xalambrí" />
      <meta name="twitter:description" value="Lead Support Engineer" />
      <meta name="twitter:image" value="" />
      <meta name="twitter:summary" value="Sergio Xalambrí's personal website'" />

      <meta property="og:type" content="website" />
      <meta property="og:title" content="Sergio Xalambrí" />
      <meta property="og:description" content="Lead Support Engineer" />
      <meta property="og:image" content="" />
      <meta property="og:url" content="https://sergio.xalambri.xyz/" />
      <meta property="og:site_name" content="Sergio Xalambrí" />
      <meta property="og:locale" content="en" />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: minify(`{
            "@context": "http://schema.org",
            "@type": "Person",
            "name": "Sergio Xalambrí",
            "image": "https://pbs.twimg.com/profile_images/799759613243559938/x5fpmbfE_400x400.jpg",
            "birthDate": "1992-09-29",
            "email": "sergiodxa@gmail.com",
            "gender": "Male",
            "givenName": "Sergio",
            "familyName": "Xalambrí",
            "jobTitle": "Lead Support Engineer",
            "worksFor": {
              "name": "ZEIT"
            }
          }`)
        }}
      />
    </Head>

    <header>
      <h1>Sergio Xalambrí</h1>
      <h2>
        Lead Support Engineer at{' '}
        <a title="▲ ZEIT" href="https://zeit.co">
          ▲ ZEIT
        </a>
      </h2>
    </header>

    <nav>
      <a href="https://medium.com/@sergiodxa/" title="Essays and Articles">
        Essays
      </a>
      <a href="https://twitter.com/@sergiodxa" title="Opinion">
        Opinion
      </a>
      <a href="https://github.com/sergiodxa" title="Code repositories">
        Code
      </a>
    </nav>

    <style jsx global>{`
      body {
        font-family: Arial, sans-serif;
        margin: 0;
        font-size: 18px;
      }
    `}</style>

    <style jsx>{`
      a {
        color: black;
        text-decoration: none;
      }
      header {
        display: flex;
        flex-direction: column;
        text-align: center;
        justify-content: space-between;
        position: fixed;
        top: 50%;
        left: 0;
        right: 0;
        transform: translateY(-50%);
      }
      h1,
      h2 {
        font-size: 1em;
        font-weight: normal;
        padding: .25em 0;
        margin: 0;
      }
      nav {
        display: flex;
        flex-wrap: wrap;
        justify-content: center;
        font-size: .9em;
        position: fixed;
        padding-bottom: 1em;
        bottom: 0;
        left: 0;
        right: 0;
        text-align: center;
      }
      nav a {
        padding: .25em .5em;
      }
      nav a:hover {
        text-decoration: underline;
      }
    `}</style>
  </main>;
