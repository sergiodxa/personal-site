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

const gql = String.raw;

async function getInitialProps(ctx) {
  console.time('getInitialProps');
  try {
    const url = ctx.asPath || format({ pathname: ctx.pathname });
    console.debug('URL:', url);
  
    const isServer = Boolean(ctx.req);
    console.debug('Is server?', isServer);
  
    if (!isServer) {
      console.info('Getting info from localStorage');
      const props = localStorage.getItem(url);
      console.debug('Retrieved info:' props);
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
    console.debug('Variables:', JSON.stringify(variables, null, 2));
    const { data, errors } = await fetch({ query, variables });
  
    if (errors) {
      console.debug('Errors:', JSON.stringify(errors, null, 2));
      return { errors };
    }
    
    const props = { ...data.getEssay };
    console.debug('Props:', JSON.stringify(props, null, 2));
  
    if (ctx.isVirtualCall) {
      console.info('Is a virtual call');
      localStorage.setItem(url, JSON.stringify(props));
    }
  
    return props;
  } finally {
    console.timeEnd('getInitialProps');
  }
}

export default compose(
  setStatic('getInitialProps', getInitialProps),
  withError,
  withGA,
  withSW,
  branch(props => props.errors, renderComponent(Error), renderComponent(Essay))
)();
