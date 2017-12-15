import Error from 'next/error';
import { format } from 'url';

import compose from 'recompose/compose';
import setStatic from 'recompose/setStatic';
import branch from 'recompose/branch';
import renderComponent from 'recompose/renderComponent';

import Essay from '../layouts/essay.js';

import fetch from '../lib/fetch.js';

import withError from '../lib/with-error.js';
import withGA from '../lib/with-ga.js';
import withSW from '../lib/with-sw.js';

async function getInitialProps(ctx) {
  if (!ctx.req) {
    const props = localStorage.getItem(
      format({ pathname: ctx.pathname, query: ctx.query })
    );
    if (props) {
      return JSON.parse(props);
    }
  }

  const query = `
    query getEssay($slug: String!) {
      getEssay(slug: $slug) {
        title
        slug
        content
        date
        description
      }
    }
  `;

  const variables = {
    slug: ctx.query.slug
  };

  const { data, errors } = await fetch({ query, variables });

  if (errors) {
    return { errors };
  }

  const props = { ...data.getEssay };

  if (ctx.isVirtualCall) localStorage.setItem(url, JSON.stringify(props));

  return props;
}

export default compose(
  setStatic('getInitialProps', getInitialProps),
  withError,
  withGA,
  withSW,
  branch(props => props.errors, renderComponent(Error), renderComponent(Essay))
)();
