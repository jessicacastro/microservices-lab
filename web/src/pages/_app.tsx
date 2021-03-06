import { UserProvider } from "@auth0/nextjs-auth0"
import '../styles/global.css'

function App({ Component, pageProps }) {
  return (
    <UserProvider>
      <Component {...pageProps} />
    </UserProvider>
  )
}

export default App
