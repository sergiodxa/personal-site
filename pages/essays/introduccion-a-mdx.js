import Error from "next/error";

import compose from "recompose/compose";
import setStatic from "recompose/setStatic";
import branch from "recompose/branch";
import renderComponent from "recompose/renderComponent";

import Layout from "../../layouts/essay";

import Article, {
  title,
  description,
  date,
  slug
} from "../../data/essays/introduccion-a-mdx.mdx";

import components from "../../components/ui/index";

import withError from "../../lib/hoc/with-error.js";
import withGA from "../../lib/hoc/with-ga.js";
import withSW from "../../lib/hoc/with-sw.js";

export default compose(
  withError,
  withGA,
  withSW,
  branch(
    props => props.errors,
    renderComponent(Error),
    renderComponent(() => (
      <Layout
        title={title}
        description={description}
        date={date}
        slug={slug}
        content={<Article components={components} />}
        noParse
      />
    ))
  )
)();
