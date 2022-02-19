import { Flex, Image, Text } from '@chakra-ui/react'

import React from 'react'
import LoginItem from './Login'

interface ItemProps {
  name: string
  active?: boolean
  left?: boolean
  onClick?: () => void
}

export const NavigationItem = ({ name, active, left, onClick }: ItemProps): JSX.Element => (
  <Text
    color={active ? 'brand.600' : 'gray'}
    fontSize="1.2em"
    fontWeight="bold"
    m="20px"
    p="10px"
    w="170px"
    textAlign="center"
    borderRadius="50px"
    cursor="pointer"
    ml={left ? 'auto' : ''}
    onClick={onClick}
  >{name}</Text>	
)

const NavigationBar = (): JSX.Element => {
  return <Flex 
    w="100%"
    justifyContent="center"
    h="120px"
  >
    <Flex
      w="80%"
      direction="row"
      alignItems="center"
    >
      <Image 
        src="images/monetae-logo.svg"
        w="180px"
      />
      <NavigationItem name="wallet" active />
      <NavigationItem name="governance" />
      <LoginItem />
    </Flex>
  </Flex>
}

export default NavigationBar