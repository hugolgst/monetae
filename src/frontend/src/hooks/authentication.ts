import { AuthClient } from '@dfinity/auth-client'
import { useContext, useState } from 'react'
import { IdentityContext } from '../App'
import { createActor } from '../../../declarations/contract'

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
        
        setActor(createActor('cyhoa-7iaaa-aaaak-aah3q-cai', {
          agentOptions: {
            identity,
          },
        }))
      },
      identityProvider:
            process.env.DFX_NETWORK === 'ic'
              ? 'https://identity.ic0.app/#authorize'
              : process.env.LOCAL_II_CANISTER,
      // Maximum authorization expiration is 8 days
      maxTimeToLive: days * hours * nanoseconds,
    })
  }

  return {
    logged,
    login
  }
}

