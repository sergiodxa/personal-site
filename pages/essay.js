import Error from 'next/error';
import { parse } from 'url';

import compose from 'recompose/compose';
import setStatic from 'recompose/setStatic';
import branch from 'recompose/branch';
import renderComponent from 'recompose/renderComponent';

import Essay from '../layouts/essay.js';

import fetch from '../lib/fetch.js';

import withError from '../lib/with-error.js';
import withGA from '../lib/with-ga.js';
import withSW from '../lib/with-sw.js';

const gql = String.raw;

async function getInitialProps(ctx) {
  const isServer = Boolean(ctx.req);

  const url = ctx.isVirtualCall
    ? ctx.pathname
    : format({ pathname: ctx.pathname, query: ctx.query });

  if (!isServer) {
    console.info('Getting info from localStorage');
    const props = localStorage.getItem(url);
    if (props) {
      return JSON.parse(props);
    }
  }

  const query = gql`
    query getEssay($slug: String!) {
      getEssay(slug: $slug) {
        title
        slug
        content
        date
        description
        canonicalUrl
      }
    }
  `;

  const variables = {
    slug: ctx.query.slug
  };

  console.info('Fetching data from GraphQL API');
  const { data, errors } = await fetch({ query, variables });

  if (errors) {
    return { errors };
  }

  const props = { ...data.getEssay };

  if (ctx.isVirtualCall) {
    console.info('Is a virtual call');
    localStorage.setItem(url, JSON.stringify(props));
  }

  return props;
}

export default compose(
  setStatic('getInitialProps', getInitialProps),
  withError,
  withGA,
  withSW,
  branch(props => props.errors, renderComponent(Error), renderComponent(Essay))
)();
