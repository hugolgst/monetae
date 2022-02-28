import { Flex, Image } from '@chakra-ui/react'

import LoginItem from './Login'
import React from 'react'

export const MobileNavigationBar = (): JSX.Element => (
  <Flex 
    justifyContent="center"
    display={{ base: 'flex', md: 'none' }}
    w="100%"
    borderBottom="1px dashed #D0D0D0"
  >
    <Flex
      w="100%"
      m="20px"
      boxSizing="border-box"
    >
      <Image 
        src="images/monetae-logo.svg"
        w="140px"
      />

      <LoginItem />
    </Flex>
  </Flex>
)

export const NavigationBar = (): JSX.Element => {
  return <Flex 
    display={{ base: 'none' , md: 'flex' }}
    w="100%"
    justifyContent="center"
    h="100px"
    borderBottom="1px dashed #D0D0D0"
    mb="30px"
  >
    <Flex
      w="100%"
      direction="row"
      alignItems="center"
    >
      <Image 
        src="images/monetae-logo.svg"
        w="180px"
      />

      <LoginItem />
    </Flex>
  </Flex>
}