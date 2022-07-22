import {
  ApolloClient,
  InMemoryCache,
  ApolloProvider,
  createHttpLink,
  ApolloLink,
} from "@apollo/client";

import { createUploadLink } from "apollo-upload-client";
import { SERVER } from "../../config";

// const httpLink = createHttpLink({
//   credentials: "include",
//   uri: SERVER + "graphql",
// });

import React from "react";

export default function Apollo({ children }) {
  const client = new ApolloClient({
    cache: new InMemoryCache(),
    link: createUploadLink({
      uri: SERVER + "graphql",
      credentials: "include",
    }),
  });

  return <ApolloProvider client={client}>{children}</ApolloProvider>;
}
