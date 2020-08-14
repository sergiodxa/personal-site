import Head from "next/head";
import "../styles.css";

export default function App({ Component, pageProps }) {
  return (
    <main role="document">
      <Head>
        <title>Sergio Xalambrí</title>
        <link rel="icon" href="/static/favicon@48.png" />
        <meta name="description" content="T-Shaped Frontend Engineer" />
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
        <meta property="og:title" content="Sergio Xalambrí" />
        <meta property="og:description" content="T-Shaped Frontend Engineer" />
        <meta
          property="og:image"
          content="https://i.microlink.io/https%3A%2F%2Fcards.microlink.io%2F%3Fpreset%3Dcontentz%26title%3DSergio%20Xalambr%C3%AD%26description%3DT-Shaped%20Frontend%20Engineer"
        />
        <meta property="og:image:alt" content="T-Shaped Frontend Engineer" />
        <meta property="og:url" content="https://sergiodxa.com/" />
        <meta property="og:site_name" content="Sergio Xalambrí" />
        <meta property="og:locale" content="en" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:site" content="@sergiodxa" />
        <meta name="twitter:creator" content="@sergiodxa" />
        <meta name="twitter:url" content="https://sergiodxa.com/" />
        <meta name="twitter:title" content="Sergio Xalambrí" />
        <meta name="twitter:description" content="T-Shaped Frontend Engineer" />
        <meta
          name="twitter:image"
          content="https://i.microlink.io/https%3A%2F%2Fcards.microlink.io%2F%3Fpreset%3Dcontentz%26title%3DSergio%20Xalambr%C3%AD%26description%3DT-Shaped%20Frontend%20Engineer"
        />
        <meta name="twitter:summary" content="T-Shaped Frontend Engineer" />
      </Head>
      <Component {...pageProps} />
    </main>
  );
}
