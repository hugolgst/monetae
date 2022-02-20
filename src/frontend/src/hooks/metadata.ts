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

export default useTokenData