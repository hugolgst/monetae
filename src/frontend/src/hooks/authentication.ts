import { AuthClient } from '@dfinity/auth-client'
import { useContext, useState } from 'react'
import { IdentityContext } from '../App'
import { createActor } from '../../../declarations/contract'
import { contractID } from '..'

export const useAuthentication = () => {
  const [ logged, setLogged ] = useState(false)
  const context = useContext(IdentityContext)
  const [ , setIdentity ] = context.identity
  const [ , setActor ] = context.actor

  const login = async () => {
    const authClient = await AuthClient.create()

    const days = BigInt(1)
    const hours = BigInt(24)
    const nanoseconds = BigInt(3600000000000)

    await authClient.login({
      onSuccess: async () => {
        setLogged(true)

        const identity = await authClient.getIdentity()
        setIdentity(identity)
        
        setActor(createActor(contractID, {
          agentOptions: {
            identity,
          },
        }))
      },
      identityProvider: 'https://identity.ic0.app/#authorize',
      maxTimeToLive: days * hours * nanoseconds,
    })
  }

  return {
    logged,
    login
  }
}

