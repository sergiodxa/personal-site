import Error from "next/error";

import compose from "recompose/compose";
import setStatic from "recompose/setStatic";
import branch from "recompose/branch";
import renderComponent from "recompose/renderComponent";

import withAnalytics from "@sergiodxa/analytics/lib/react";

import Layout from "../../layouts/essay";

import Article, { meta } from "../../data/essays/documentation.mdx";

import components from "../../components/ui/index";

import withError from "../../lib/hoc/with-error.js";
import withSW from "../../lib/hoc/with-sw.js";

export default compose(
  withError,
  Page => withAnalytics(Page, process.env.NODE_ENV === "production"),
  withSW,
  branch(
    props => props.errors,
    renderComponent(Error),
    renderComponent(() => (
      <Layout
        {...meta}
        content={<Article components={components} />}
        noParse
      />
    ))
  )
)();
