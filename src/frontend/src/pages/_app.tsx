import { AppProps } from 'next/app'
import { ChakraProvider } from '@chakra-ui/react'
import Fonts from '../fonts'
import React from 'react'
import theme from '../theme'

const App = ({ Component, pageProps }: AppProps): JSX.Element => (
  <ChakraProvider resetCSS theme={theme}>
    <Fonts />
    <Component {...pageProps} />
  </ChakraProvider>
)

export default App
