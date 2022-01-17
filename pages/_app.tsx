import type { AppProps } from 'next/app'
import { ChakraProvider } from '@chakra-ui/react'
import { UserProvider } from '@auth0/nextjs-auth0';
import theme from '../lib/theme'

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <UserProvider>
      <ChakraProvider theme={theme}>
        <Component {...pageProps} />
      </ChakraProvider>
    </UserProvider>
  )
}

export default MyApp