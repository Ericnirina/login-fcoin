import '../styles/globals.css'
import 'bootstrap/dist/css/bootstrap.css'
import {SessionProvider} from "next-auth/react"
function MyApp({ Component, pageProps }) {
  return <Component {...pageProps} />
  
}

export default MyApp
