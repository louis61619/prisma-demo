import type { AppProps } from 'next/app'
import { ApolloProvider } from '@apollo/client'
import Layout from '../components/Layout'
import apolloClient from '../lib/apollo'

import '../styles/globals.css'

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <ApolloProvider client={apolloClient}>
      <Layout>
        <Component {...pageProps} />
      </Layout>
    </ApolloProvider>
  )
}

export default MyApp
