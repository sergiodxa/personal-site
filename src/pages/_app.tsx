import Head from "next/head";
import "../styles.css";

export default function App({ Component, pageProps }) {
  return (
    <main role="document" className="px-2">
      <Head>
        <title>Sergio Xalambrí</title>
      </Head>
      <Component {...pageProps} />
    </main>
  );
}
