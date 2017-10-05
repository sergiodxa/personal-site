import Head from 'next/head';

const defaultProps = {
  type: 'summary',
  site: '@sergiodxa',
  creator: '@sergiodxa',
  url: 'https://sergio.now.sh/',
  title: 'Sergio Xalambrí',
  description: 'Lead Support Engineer',
  image: 'https://sergio.now.sh/static/avatar.jpg',
  summary: "Sergio Xalambrí's personal website"
};

const TwitterCard = ({
  type,
  site,
  creator,
  url,
  title,
  description,
  image,
  summary
}) => (
  <Head>
    <meta name="twitter:card" value={type} key="type" />
    <meta name="twitter:site" value={site} key="site" />
    <meta name="twitter:creator" value={creator} key="creator" />
    <meta name="twitter:url" value={url} key="url" />
    <meta name="twitter:title" value={title} key="title" />
    <meta name="twitter:description" value={description} key="description" />
    <meta name="twitter:image" value={image} key="image" />
    <meta name="twitter:summary" value={summary} key="summary" />
  </Head>
);

TwitterCard.defaultProps = defaultProps;

export default TwitterCard;
