import { Identity } from '@dfinity/agent'
import { AuthClient } from '@dfinity/auth-client'
import { useState } from 'react'

export const useAuthentication = () => {
  const [ logged, setLogged ] = useState(false)
  const [ identity, setIdentity ] = useState<Identity>()

  const login = async () => {
    const authClient = await AuthClient.create()

    const days = BigInt(1)
    const hours = BigInt(24)
    const nanoseconds = BigInt(3600000000000)

    await authClient.login({
      onSuccess: async () => {
        setLogged(true)
        setIdentity(await authClient.getIdentity())
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
    identity,
    login
  }
}

