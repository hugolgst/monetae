import { Flex } from '@chakra-ui/react'
import { NavigationBar } from './navigation'
import React from 'react'

const Container = (): JSX.Element => {
  return <Flex 
    w="100%"
    direction="column"
    alignItems="center"
  >
    <Flex
      w={{ base: '100%', md: '60%' }}
      bgColor="white"
      borderRadius="35px"
      alignItems="center"
      justifyContent="center"
    >
      <Flex 
        direction="column"
        w="92%"
      >
        <NavigationBar />

        test
      </Flex>
    </Flex>
  </Flex>
}

export default Container