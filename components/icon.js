import Head from 'next/head';

export default ({ name }) => (
  <i className={`icon-${name.toLowerCase()}`} alt={name}>
    <Head>
      <link rel="stylesheet" href="/static/icons/style.css" />
    </Head>
  </i>
);
