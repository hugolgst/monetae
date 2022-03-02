import { useContext, useEffect, useState } from 'react'

import { IdentityContext } from '../App'
import { useQuery } from 'react-query'

type Metadata = {
    decimals: number,
    fee: number,
    name: string,
    symbol: string
}

/***
 * Hook to retrieve the basic metadata of the token including
 * decimals, fee, name and symbol.
 * Is not a react-query because it should never be updated in the 
 * smart contract.
 */
export const useTokenData = (): Metadata => {
  const [ actor ] = useContext(IdentityContext).actor
  const [ metadata, setMetadata ] = useState<Metadata>({
    decimals: 0,
    fee: 0,
    name: '',
    symbol: ''
  })

  useEffect(() => {
    const retreiveData = async () => {
      setMetadata({
        decimals: await actor.decimals(),
        fee: Number(await actor.fee()),
        name: await actor.name(),
        symbol: await actor.symbol()
      })
    }

    if (actor) retreiveData()
  }, [ actor ])

  return metadata
}

interface BalanceType {
  loading: boolean,
  balance: number
}

/***
 * Hook to retrieve the logged user's balance when actor and identity
 * has been set.
 * 
 * Returns the loading state as well as the balance.
 */
export const useBalance = (): BalanceType => {
  const { actor: actorState, identity: identityState } = useContext(IdentityContext)
  const [ actor ] = actorState
  const [ identity ] = identityState
  
  const { isLoading, data } = useQuery(
    ['balance', actor, identity], 
    () => actor.balanceOf(identity.getPrincipal()), 
    { enabled: Boolean(actor && identity.getPrincipal()) }
  ) 

  return {
    loading: isLoading,
    balance: Number(data)
  }
}