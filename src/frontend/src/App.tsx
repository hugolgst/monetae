import { ActorSubclass, Identity } from '@dfinity/agent'
import { Fonts, theme } from './theme'
import { QueryClient, QueryClientProvider, useQuery } from 'react-query'
import React, { Dispatch, SetStateAction, createContext, useEffect, useState } from 'react'

import {
  ChakraProvider,
} from '@chakra-ui/react'
import Container from './components/Container'
import PageLoader from './components/PageLoader'
import { _SERVICE } from '../../declarations/contract/contract.did'

type State<T> = [T | undefined, Dispatch<SetStateAction<T | undefined>>]
type Context = {
  identity: State<Identity> | undefined,
  actor: State<ActorSubclass<_SERVICE>> | undefined
}
export const IdentityContext = createContext<Context>({
  identity: undefined,
  actor: undefined
})

export const queryClient = new QueryClient()

export const App = () => {
  const identityState = useState<Identity>()
  const actorState = useState<ActorSubclass<_SERVICE>>()
  const [ isLoading, setLoadingState ] = useState(true)

  useEffect(() => {
    // Show the loader for a minimum amount of time
    setTimeout(() => {
      setLoadingState(false)
    }, 2000)
  }, [])

  return <ChakraProvider resetCSS theme={theme}>
    <Fonts />
    <IdentityContext.Provider value={{
      identity: identityState,
      actor: actorState
    }}>
      <QueryClientProvider client={queryClient}>
        { isLoading ? <PageLoader /> : null }

        <Container />
      </QueryClientProvider>
    </IdentityContext.Provider>
  </ChakraProvider>
}