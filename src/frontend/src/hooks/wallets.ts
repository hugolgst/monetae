import { useEffect, useState } from 'react'

export type Wallet = {
	name: string,
	address: string,
}

export const useWallets = (): [ Array<Wallet>, (wallet: Wallet) => void ] => {
  const [ wallets, setWallets ] = useState<Array<Wallet>>([])

  useEffect(() => {
    const data = localStorage.getItem('wallets')
    if (data) {
      setWallets(JSON.parse(data))
    }
  }, [])

  return [
    wallets,
    (wallet: Wallet) => {
      setWallets([ ...wallets, wallet ])
      localStorage.setItem('wallets', JSON.stringify(wallets))
    }
  ]
}