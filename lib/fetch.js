import { createApolloFetch } from 'apollo-fetch';

const uri =
  process.env.NODE_ENV === 'production'
    ? 'https://sergio.now.sh/graphql'
    : 'http://localhost:3000/graphql';

export default createApolloFetch({ uri });
