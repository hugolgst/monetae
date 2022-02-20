import React, { useState, createContext, Dispatch, SetStateAction } from 'react'
import {
  ChakraProvider,
} from '@chakra-ui/react'
import NavigationBar from './components/navigation'
import { theme, Fonts } from './theme'
import Wallets from './components/wallets'
import { Identity, ActorSubclass } from '@dfinity/agent'
import { _SERVICE } from "../../declarations/contract/contract.did"

type Context = {
  identity: [Identity | undefined, Dispatch<SetStateAction<Identity | undefined>>] | undefined,
  actor: [ActorSubclass<_SERVICE> | undefined, Dispatch<SetStateAction<ActorSubclass<_SERVICE> | undefined>>] | undefined
}
export const IdentityContext = createContext<Context>({
  identity: undefined,
  actor: undefined
})

export const App = () => {
  const identityState = useState<Identity>()
  const actorState = useState<ActorSubclass<_SERVICE>>()

  return <ChakraProvider resetCSS theme={theme}>
    <Fonts />
    <IdentityContext.Provider value={{
      identity: identityState,
      actor: actorState
    }}>
      <NavigationBar />
      <Wallets />
    </IdentityContext.Provider>
  </ChakraProvider>
}