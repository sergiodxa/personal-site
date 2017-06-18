import Head from 'next/head';

const URL = {
  essays: 'https://medium.com/@sergiodxa/',
  opinion: 'https://twitter.com/@sergiodxa',
  code: 'https://github.com/sergiodxa',
};

export default () =>
  <main>
    <Head>
      <title>Sergio Xalambrí</title>
      <meta
        name="viewport"
        content="width=device-width, initial-scale=1.0, minimum-scale=1.0, maximum-scale=1.0"
      />
      <meta name="description" content="JavaScript Developer" />
      <meta name="language" content="en" />
      <meta name="author" content="Sergio Xalambrí, sergio@xalambri.xyz" />
      <meta name="subject" content="Personal website" />
      <meta name="pagename" content="Sergio Xalambrí" />
      <meta name="HandheldFriendly" content="True" />
      <meta name="MobileOptimized" content="320" />
      <meta name="date" content="Sep. 29, 2016" />

      <meta name="apple-mobile-web-app-title" content="Sergio Xalambrí" />
      <meta content="IE=edge,chrome=1" http-equiv="X-UA-Compatible" />

      <meta name="twitter:card" value="summary" />
      <meta name="twitter:site" value="@sergiodxa" />
      <meta name="twitter:creator" value="@sergiodxa" />
      <meta name="twitter:url" value="https://sergio.xalambri.xyz/" />
      <meta name="twitter:title" value="Sergio Xalambrí" />
      <meta name="twitter:description" value="JavaScript Developer" />
      <meta name="twitter:image" value="" />
      <meta name="twitter:summary" value="Sergio Xalambrí's personal website'" />

      <meta property="og:type" content="website" />
      <meta property="og:title" content="Sergio Xalambrí" />
      <meta property="og:description" content="JavaScript Developer" />
      <meta property="og:image" content="" />
      <meta property="og:url" content="https://sergio.xalambri.xyz/" />
      <meta property="og:site_name" content="Sergio Xalambrí" />
      <meta property="og:locale" content="en" />
    </Head>

    <header>
      <h1>Sergio Xalambrí</h1>
      <h2>
        JavaScript Developer at
        {' '}
        <a title="Platzi" href="https://platzi.com">
          Platzi
        </a>
      </h2>
    </header>

    <nav>
      <a href={URL.essays} title="Essays and Articles">Essays</a>
      <a href={URL.opinion} title="Opinion">Opinion</a>
      <a href={URL.code} title="Code repositories">Code</a>
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
      h1, h2 {
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
