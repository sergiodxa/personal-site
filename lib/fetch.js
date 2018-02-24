import "isomorphic-fetch";
import { ApolloClient } from "apollo-client";
import { HttpLink } from "apollo-link-http";
import { InMemoryCache } from "apollo-cache-inmemory";
import { persistCache } from "apollo-cache-persist";

const isDev = process.env.NODE_ENV !== "production";

const uri = !isDev
  ? "https://sergiodxa.com/graphql"
  : "http://localhost:3000/graphql";

const link = new HttpLink({ uri });
const cache = new InMemoryCache();

if (typeof window !== "undefined") {
  persistCache({ cache, storage: window.localStorage });
}

export default new ApolloClient({ link, cache });
