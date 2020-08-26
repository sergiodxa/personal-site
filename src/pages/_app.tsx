import Head from "next/head";
import "styles.css";

export default function App({ Component, pageProps }) {
  return (
    <main role="document">
      <Head>
        <link rel="icon" href="/static/favicon@48.png" />
        <meta name="language" content="en" />
        <meta name="author" content="Sergio Xalambrí" />
        <meta name="pagename" content="Sergio Xalambrí" />
        <meta name="HandheldFriendly" content="True" />
        <meta name="MobileOptimized" content="320" />
        <meta name="robots" content="index, follow" />
        <meta name="theme-color" content="black" />
        <meta name="apple-mobile-web-app-title" content="Sergio Xalambrí" />
        <meta httpEquiv="X-UA-Compatible" content="IE=edge,chrome=1" />
        <meta property="og:type" content="website" />
        <meta property="og:site_name" content="Sergio Xalambrí" />
        <meta property="og:locale" content="en" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:site" content="@sergiodxa" />
        <meta name="twitter:creator" content="@sergiodxa" />
      </Head>
      <Component {...pageProps} />
    </main>
  );
}
