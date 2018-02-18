import "isomorphic-fetch";
import { ApolloClient } from "apollo-client";
import { HttpLink } from "apollo-link-http";
import { InMemoryCache } from "apollo-cache-inmemory";

const isDev = process.env.NODE_ENV !== "production";

const uri = !isDev
  ? "https://sergiodxa.com/graphql"
  : "http://localhost:3000/graphql";

const link = new HttpLink({ uri });
const cache = new InMemoryCache();

export default new ApolloClient({ link, cache });
