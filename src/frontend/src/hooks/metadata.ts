import { useContext, useEffect, useState } from 'react'
import { IdentityContext } from '../App'

type Metadata = {
    decimals: number,
    fee: number,
    name: string,
    symbol: string
}

const useTokenData = (): Metadata => {
  const [ actor ] = useContext(IdentityContext).actor
  const [ metadata, setMetadata ] = useState<Metadata>({
    decimals: 0,
    fee: 0,
    name: '',
    symbol: ''
  })

  useEffect(() => {
    if (actor) {
      actor.decimals().then(decimals => setMetadata({
        ...metadata,
        decimals
      }))
      actor.fee().then(fee => setMetadata({
        ...metadata,
        fee: Number(fee)
      }))
      actor.name().then(name => setMetadata({
        ...metadata,
        name
      }))
      actor.symbol().then(symbol => setMetadata({
        ...metadata,
        symbol
      }))
    }
  }, [ actor ])

  return metadata
}

export default useTokenData