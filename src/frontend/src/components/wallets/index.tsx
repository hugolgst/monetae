import { AddIcon, AtSignIcon } from '@chakra-ui/icons'
import { Box, Button, Flex, Heading, Text, chakra } from '@chakra-ui/react'
import { Wallet as WalletType, useWallets } from '../../hooks/wallets'

import React, { useContext, useEffect } from 'react'
import { IdentityContext } from '../../App'

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

const HeroTitle = ({ title, sizes, value }: {
    title: string,
    sizes: [string, string],
    value: number
}): JSX.Element => (
  <Flex>
    <Heading fontSize={sizes[0]}>{title}</Heading>
    <Funds value={value} sizes={sizes} />
  </Flex>
)

const Wallet = ({ name, address }: WalletType): JSX.Element => (
  <Flex
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
      <Text color="gray.500" ml="auto">click to copy</Text>
    </Flex>
  </Flex>
)

const Wallets = (): JSX.Element => {
  const [ wallets, setWallets ] = useWallets()
  const [ identity ] = useContext(IdentityContext)

  useEffect(() => {
    if (!identity) return

    setWallets([
      {
        name: 'Main',
        address: identity.getPrincipal().toString()
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

      { wallets.map((wallet, i) => (
        <Wallet key={i} {...wallet} />
      ))}

      <Button 
        w="max-content"
        leftIcon={<AddIcon />}
        size="lg"
        mt="auto"
        disabled
      >Add wallet</Button>
    </Flex>
  </Flex>
}

export default Wallets