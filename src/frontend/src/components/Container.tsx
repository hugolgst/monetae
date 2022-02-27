import { MobileNavigationBar, NavigationBar } from './navigation'

import { Flex } from '@chakra-ui/react'
import InformationBar from './information'
import React from 'react'
import Wallets from './wallets'

const Container = (): JSX.Element => {
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

        <Wallets />
      </Flex>
    </Flex>
  </Flex>
}

export default Container