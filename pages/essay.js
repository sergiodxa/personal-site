import Error from "next/error";
import { format } from "url";
import gql from "graphql-tag";

import compose from "recompose/compose";
import setStatic from "recompose/setStatic";
import branch from "recompose/branch";
import renderComponent from "recompose/renderComponent";

import withAnalytics from "@sergiodxa/analytics/lib/react";

import Essay from "../layouts/essay.js";

import fetch from "../lib/fetch.js";

import withError from "../lib/hoc/with-error.js";
import withSW from "../lib/hoc/with-sw.js";

async function getInitialProps(ctx) {
  const query = gql`
    query getEssay($slug: String!) {
      getEssay(slug: $slug) {
        title
        slug
        content
        date
        description
        canonicalUrl
        lang
        tags
        translateFrom {
          url
          lang
          title
        }
      }
    }
  `;

  const variables = {
    slug: ctx.query.slug
  };

  const { data, errors } = await fetch.query({ query, variables });

  if (errors) {
    return { errors };
  }

  const props = { ...data.getEssay };

  return props;
}

export default compose(
  setStatic("getInitialProps", getInitialProps),
  withError,
  withAnalytics,
  withSW,
  branch(props => props.errors, renderComponent(Error), renderComponent(Essay))
)();
