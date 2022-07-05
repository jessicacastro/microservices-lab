import { ApolloClient, createHttpLink, from, InMemoryCache } from '@apollo/client';

const httpLink = createHttpLink({
  uri: 'http://localhost:4003/graphql',
  fetch,
})

const cacheInMemory = new InMemoryCache()

const apolloClient = new ApolloClient({
  link: from([httpLink]),
  cache: cacheInMemory,
});

export {apolloClient};