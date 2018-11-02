import Head from "next/head";
import PropTypes from "prop-types";

function TwitterCard({ type, site, creator, url, title, description, image, summary }) {
  return (
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
}

TwitterCard.propTypes = {
  type: PropTypes.string,
  site: PropTypes.string,
  creator: PropTypes.string,
  url: PropTypes.string,
  title: PropTypes.string,
  description: PropTypes.string,
  image: PropTypes.string,
  summary: PropTypes.string
}

TwitterCard.defaultProps = {
  type: "summary_large_image",
  site: "@sergiodxa",
  creator: "@sergiodxa",
  url: "https://sergiodxa.com/",
  title: "Sergio Xalambrí",
  description: "Software Engineer & Technical Writer",
  image: "https://sergiodxa.com/static/open-graph.png",
  summary: "Sergio Xalambrí's personal website"
}

export default TwitterCard;
