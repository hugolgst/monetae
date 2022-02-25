import { AtSignIcon } from '@chakra-ui/icons'
import { Code, chakra, Heading, Text, Flex, useToast } from '@chakra-ui/react'
import { Principal } from '@dfinity/principal'
import React, { useContext, useEffect, useState } from 'react'
import { IdentityContext } from '../../App'
import useTokenData from '../../hooks/metadata'

export type WalletType = {
  address: Principal
}

const formatNumber = (val: number): string => {
  const [strNum, decimals] = val.toString().split('.')
  const result = []
  for (let i = 0; i < Math.ceil(strNum.length / 3); i++) {
    const surplus = strNum.length % 3
    if (surplus != 0 && i == 0) {
      result.push(strNum.slice(0, surplus))
      continue
    }

    const start = (i-1) * 3 + surplus
    result.push(strNum.slice(start, start + 3))
  }

  return `${result.join('\'')}${decimals? '.' + decimals : ''}`
}

const Wallet = ({ address }: WalletType): JSX.Element => {
  const toast = useToast()
  const [ actor ] = useContext(IdentityContext).actor
  const [ balance, setBalance ] = useState<number>(-1)
  const { symbol, name, decimals } = useTokenData()

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
    justifyContent="space-between"
    p="30px"
    direction="column"
    flexWrap="wrap"
    gap="12px"
  >
    <Text
      textTransform="capitalize"
      color="gray.500"
    >{name}</Text>
    <Heading>
      <chakra.span fontSize="1em">{symbol}</chakra.span> {formatNumber(balance / 10**decimals)}
    </Heading>

    <Flex alignItems="center">
      <AtSignIcon /> 
      <Code>{address.toString()}</Code>
    </Flex>
    <Flex direction={{ base: 'column', md: 'row' }}>
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