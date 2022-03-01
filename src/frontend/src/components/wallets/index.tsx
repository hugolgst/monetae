import { Code, Flex, Heading, Skeleton, Text, chakra, useToast } from '@chakra-ui/react'
import { useBalance, useTokenData } from '../../hooks/metadata'

import { AtSignIcon } from '@chakra-ui/icons'
import { Principal } from '@dfinity/principal'
import React from 'react'

export type WalletType = {
  address: Principal
}

const formatNumber = (val: number): string => {
  const [number, decimals] = val.toString().split('.')
  let result = []

  for (let _i = 0; _i < number.length; _i += 3) {
    const i = number.length - _i

    const chunk = number.slice(i - 3, i)
    result.unshift(chunk)
  }

  const surplus = number.length % 3
  if (surplus != 0) {
    result.unshift(number.slice(0, surplus))
  }

  result = result.filter(item => item !== '')
  
  return `${result.join('\'')}.${decimals ? decimals : '-'}`
}

const Wallet = ({ address }: WalletType): JSX.Element => {
  const toast = useToast()
  const { loading, balance } = useBalance()
  const { symbol, name, decimals } = useTokenData()

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
    <Skeleton isLoaded={!loading}>
      <Heading size="3xl">
        <chakra.span fontSize="0.6em">{symbol}</chakra.span> {formatNumber(balance / 10 ** decimals)}
      </Heading>
    </Skeleton>

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