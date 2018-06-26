import Head from "next/head";
import PropTypes from "prop-types";

function OpenGraph({ type, title, description, image, imageAlt, url, siteName, locale }) {
  return (
    <Head>
    <meta property="og:type" content={type} />
    <meta property="og:title" content={title} />
    <meta property="og:description" content={description} />
    <meta property="og:image" content={image} />
    <meta property="og:image:alt" content={imageAlt} />
    <meta property="og:url" content={url} />
    <meta property="og:site_name" content={siteName} />
    <meta property="og:locale" content={locale} />
  </Head>
  )
}

OpenGraph.propTypes = {
  type: PropTypes.string,
  title: PropTypes.string,
  description: PropTypes.string,
  image: PropTypes.string,
  url: PropTypes.string,
  siteName: PropTypes.string,
  locale: PropTypes.string
};

OpenGraph.defaultProps = {
  type: "website",
    title: "Sergio Xalambrí",
    description: "Lead Support Engineer at ▲ZEIT",
    image: "https://sergiodxa.com/static/open-graph.png",
    imageAlt: "Sergio Xalambrí - Lead Support Engineer at ▲ZEIT",
    url: "https://sergiodxa.com/",
    siteName: "Sergio Xalambrí",
    locale: "en"
}

export default OpenGraph;
