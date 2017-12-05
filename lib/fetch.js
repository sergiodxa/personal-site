import { createApolloFetch } from 'apollo-fetch';

const URL = 'https://sergio.now.sh/graphql';

export default createApolloFetch({ uri: URL });
