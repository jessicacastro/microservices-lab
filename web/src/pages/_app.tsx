import { UserProvider } from "@auth0/nextjs-auth0"
import { apolloClient } from "../libs/apollo/apollo"
import { ApolloProvider } from '@apollo/client'

function App({ Component, pageProps }) {
  return (
    <UserProvider>
      <ApolloProvider client={apolloClient}>
        <Component {...pageProps} />
      </ApolloProvider>
    </UserProvider>
  )
}

export default App
