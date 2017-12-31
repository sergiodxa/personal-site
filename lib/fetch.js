import { createApolloFetch } from 'apollo-fetch';

const uri =
  process.env.NODE_ENV === 'production'
    ? 'https://sergiodxa.com/graphql'
    : 'http://localhost:3000/graphql';

export default createApolloFetch({ uri });
