import Head from 'next/head';

const defaultProps = {
  type: 'website',
  title: 'Sergio Xalambrí',
  description: 'Lead Support Engineer',
  image: 'https://sergio.now.sh/static/avatar.jpg',
  url: 'https://sergio.now.sh/',
  siteName: 'Sergio Xalambrí',
  locale: 'en'
};

const OpenGraph = ({
  type,
  title,
  description,
  image,
  url,
  siteName,
  locale
}) => (
  <Head>
    <meta property="og:type" content={type} />
    <meta property="og:title" content={title} />
    <meta property="og:description" content={description} />
    <meta property="og:image" content={image} />
    <meta property="og:url" content={url} />
    <meta property="og:site_name" content={siteName} />
    <meta property="og:locale" content={locale} />
  </Head>
);

OpenGraph.defaultProps = defaultProps;

export default OpenGraph;
