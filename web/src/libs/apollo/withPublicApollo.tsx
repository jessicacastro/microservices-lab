import { GetServerSidePropsContext, NextPage } from 'next';
import { 
  ApolloClient, 
  createHttpLink, 
  from, 
  InMemoryCache, 
  ApolloProvider, 
  NormalizedCacheObject 
} from '@apollo/client';

export type ApolloClientContext = GetServerSidePropsContext;


// HOC => High order component
export const withPublicApollo = (Component: NextPage) => {
  return function Provider(props: any) {
    return (
      <ApolloProvider client={getApolloClient(undefined, props.apolloState)}>
        <Component {...props} />
      </ApolloProvider>
    )
  }
}

export function getApolloClient(ctx?: ApolloClientContext, ssrCache?: NormalizedCacheObject) {
  const httpLink = createHttpLink({
    uri: 'http://localhost:4003/graphql',
    fetch,
  })
  
  const cacheInMemory = new InMemoryCache().restore(ssrCache ?? {})
  
  return new ApolloClient({
    link: from([httpLink]),
    cache: cacheInMemory,
  })
}