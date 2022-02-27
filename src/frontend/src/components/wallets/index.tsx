import { Box, Button, Flex, Heading, Text, chakra, useDisclosure } from '@chakra-ui/react'
import React, { useContext, useEffect, useState } from 'react'
import Wallet, { WalletType } from './Wallet'

import { AddIcon } from '@chakra-ui/icons'
import { IdentityContext } from '../../App'
import TransferModal from './Transfer'
import useTokenData from '../../hooks/metadata'

const Funds = ({ value, sizes }: {
    value: number,
    sizes: [string, string]
}): JSX.Element => {
  const { decimals, symbol } = useTokenData()

  return <Heading
    fontSize={sizes[0]}
    ml="auto"
  >
    {value < 0 || !decimals ? 'N/A' : value / 10 ** decimals} <chakra.span fontSize={sizes[1]} fontWeight="normal">{symbol}</chakra.span>
  </Heading>
}

export const HeroTitle = ({ title, sizes, value }: {
    title: string,
    sizes: [string, string],
    value: number
}): JSX.Element => (
  <Flex>
    <Heading fontSize={sizes[0]}>{title}</Heading>
    <Funds value={value} sizes={sizes} />
  </Flex>
)


const Wallets = (): JSX.Element => {
  const [ wallets, setWallets ] = useState<Array<WalletType>>()
  const [ identity ] = useContext(IdentityContext).identity
  const disclosure = useDisclosure()
  const { onOpen } = disclosure

  useEffect(() => {
    if (!identity) return

    setWallets([
      {
        address: identity.getPrincipal()
      }
    ])
  }, [ identity ])

  return <Flex
    w="100%"
    justifyContent="center"
  >
    <Flex 
      direction="column"
      w={{ base: '70%', md: '40%' }}
      m={{ base: '5vh 0', md: '0' }}
      h="100%"
      justifyContent="center"
      alignItems="center"
    >
      <Box m="5% 0" w="100%">
        <Heading size="xl">Account</Heading>
      </Box>

      { wallets ? wallets.map((wallet, i) => (
        <Wallet key={i} {...wallet} />
      )) : <Text color="gray.300" fontSize="0.8em">No wallet listed yet.</Text> }
    </Flex>

    <TransferModal disclosure={disclosure} />
  </Flex>
}

export default Wallets