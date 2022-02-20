import { AddIcon } from '@chakra-ui/icons'
import { Text, Box, Button, Flex, Heading, chakra } from '@chakra-ui/react'

import React, { useContext, useEffect, useState } from 'react'
import { IdentityContext } from '../../App'
import Wallet, { WalletType } from './Wallet'

const Funds = ({ value, sizes }: {
    value: number,
    sizes: [string, string]
}): JSX.Element => (
  <Heading
    fontSize={sizes[0]}
    ml="auto"
  >
    {value < 0 ? 'N/A' : value} <chakra.span fontSize={sizes[1]} fontWeight="normal">MAE</chakra.span>
  </Heading>
)

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

  useEffect(() => {
    if (!identity) return

    setWallets([
      {
        name: 'Main',
        address: identity.getPrincipal()
      }
    ])
  }, [ identity ])

  return <Flex
    w="100%"
    h="80vh"
    justifyContent="center"
  >
    <Flex 
      direction="column"
      w="40%"
      h="100%"
      justifyContent="center"
      alignItems="center"
    >
      <Box m="5% 0" w="100%">
        <HeroTitle title="Account" value={-1} sizes={['4xl', 'md']} />
      </Box>

      { wallets ? wallets.map((wallet, i) => (
        <Wallet key={i} {...wallet} />
      )) : <Text color="gray.300" fontSize="0.8em">No wallet listed yet.</Text> }

      <Button 
        w="max-content"
        leftIcon={<AddIcon />}
        size="lg"
        mt="auto"
        disabled
      >New transaction</Button>
    </Flex>
  </Flex>
}

export default Wallets