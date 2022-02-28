import { Box, Flex } from '@chakra-ui/react'
import { MobileNavigationBar, NavigationBar } from './navigation'
import React, { useContext } from 'react'

import { IdentityContext } from '../App'
import InformationBar from './information'
import Transfer from './wallets/Transfer'
import Wallet from './wallets'

const Container = (): JSX.Element => {
  const [identity] = useContext(IdentityContext).identity

  return <Flex 
    w="100vw"
    direction="column"
    alignItems="center"
  >
    <InformationBar />
    
    <Flex
      w={{ base: '100%', md: '60%' }}
      h="100vh"
      bgColor="white"
      borderRadius="35px"
      justifyContent="center"
    >
      <Flex 
        direction="column"
        w="92%"
      >
        <NavigationBar />
        <MobileNavigationBar />

        <Flex 
          w="100%"
          direction={{ base: 'column', md: 'row' }}
          alignItems="center"
        >
          <Box w={{ base: '95%', md: '70%' }}>
            { identity ? <Wallet address={identity.getPrincipal()} /> : null }
          </Box>

          <Box w={{ base: '95%', md: '30%' }}>
            <Transfer />
          </Box>
        </Flex>
      </Flex>
    </Flex>
  </Flex>
}

export default Container