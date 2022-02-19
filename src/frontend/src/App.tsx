import * as React from 'react'
import {
  ChakraProvider,
} from '@chakra-ui/react'
import NavigationBar from './components/navigation'
import { theme, Fonts } from './theme'
import Wallets from './components/wallets'

export const App = () => (
  <ChakraProvider resetCSS theme={theme}>
    <Fonts />
    <NavigationBar />
    <Wallets />
  </ChakraProvider>
)
