import { AtSignIcon } from '@chakra-ui/icons'
import { Text, Flex, useToast } from '@chakra-ui/react'
import React from 'react'
import { HeroTitle } from '.'

export type WalletType = {
  name: string,
  address: string
}

const Wallet = ({ name, address }: WalletType): JSX.Element => {
  const toast = useToast()

  const copy = () => {
    navigator.clipboard.writeText(address)
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
    <HeroTitle title={name} value={-1} sizes={['xl', 'xs']} />
    <Text><AtSignIcon /> {address}</Text>
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