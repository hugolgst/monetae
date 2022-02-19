import { ComponentWithAs, Flex, IconProps, Image, Text } from '@chakra-ui/react'

import React from 'react'
import LoginItem from './Login'



interface ItemProps {
  name: string
  active?: boolean
  left?: boolean
  onClick?: () => void
  icon?: ComponentWithAs<'svg', IconProps>
}

export const NavigationItem = ({ name, active, left, onClick, icon: Icon }: ItemProps): JSX.Element => (
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
  >{Icon ? <Icon /> : null} {name}</Text>	
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
      <NavigationItem name="Wallet" active />
      <NavigationItem name="Governance" />
      <LoginItem />
    </Flex>
  </Flex>
}

export default NavigationBar