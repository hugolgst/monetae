import { AtSignIcon } from '@chakra-ui/icons'
import { Text, Flex, useToast } from '@chakra-ui/react'
import { Principal } from '@dfinity/principal'
import React, { useContext, useEffect, useState } from 'react'
import { HeroTitle } from '.'
import { IdentityContext } from '../../App'

export type WalletType = {
  name: string,
  address: Principal
}

const Wallet = ({ name, address }: WalletType): JSX.Element => {
  const toast = useToast()
  const [ actor ] = useContext(IdentityContext).actor
  const [ balance, setBalance ] = useState<number>(-1)

  useEffect(() => {
    if (actor && address) {
      actor.balanceOf(address).then((balance: BigInt) => {
        setBalance(Number(balance))
      })
    }
  }, [])

  const copy = () => {
    navigator.clipboard.writeText(address.toString())
    toast({
      title: 'Address copied',
      variant: 'subtle',
      isClosable: true
    })
  }

  return <Flex
    borderRadius="10px"
    bgColor="gray.100"
    w="100%"
    h="160px"
    justifyContent="space-between"
    p="30px"
    direction="column"
  >
    <HeroTitle title={name} value={balance} sizes={['xl', 'xs']} />
    <Text><AtSignIcon /> {address.toString()}</Text>
    <Flex>
      <Text color="gray.500">voting weight: N/A</Text>
      <Text 
        color="gray.500" 
        ml="auto"
        cursor="pointer"
        onClick={copy}
      >
        click to copy
      </Text>
    </Flex>
  </Flex>
}

export default Wallet