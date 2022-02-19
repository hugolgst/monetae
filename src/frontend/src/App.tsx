import React, { useState, createContext, Dispatch, SetStateAction } from 'react'
import {
  ChakraProvider,
} from '@chakra-ui/react'
import NavigationBar from './components/navigation'
import { theme, Fonts } from './theme'
import Wallets from './components/wallets'
import { Identity } from '@dfinity/agent'

export const IdentityContext = createContext<[Identity | undefined, Dispatch<SetStateAction<Identity | undefined>> | undefined]>([undefined, undefined])

export const App = () => {
  const identityState = useState<Identity>()

  return <ChakraProvider resetCSS theme={theme}>
    <Fonts />
    <IdentityContext.Provider value={identityState}>
      <NavigationBar />
      <Wallets />
    </IdentityContext.Provider>
  </ChakraProvider>
}