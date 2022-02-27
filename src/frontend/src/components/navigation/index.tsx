import { AtSignIcon, CloseIcon, HamburgerIcon } from '@chakra-ui/icons'
import { ComponentWithAs, Flex, IconProps, Image, Menu, MenuButton, MenuItem, MenuList, Text } from '@chakra-ui/react'

import LoginItem from './Login'
import React from 'react'

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
    fontWeight="600"
    textTransform="uppercase"
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

export const MobileNavigationBar = (): JSX.Element => (
  <Flex 
    justifyContent="center"
    display={{ base: 'flex', md: 'none' }}
    w="100%"
  >
    <Flex
      w="80%"
      m="20px"
      boxSizing="border-box"
    >
      <Image 
        src="images/monetae-logo.svg"
        w="140px"
      />

      <Menu>
        {({ isOpen }) => (
          <>
            <MenuButton 
              display={{ base: 'block', md: 'none' }}
              ml="auto"
            >
              {isOpen ? <CloseIcon w={4} h={4} /> : <HamburgerIcon w={7} h={7} />}
            </MenuButton>
            <MenuList
              backgroundColor="transparent-bg"
              style={{
                backdropFilter: 'blur(4px)',
                WebkitBackdropFilter: 'blur(4px)'
              }}
            >
              <MenuItem icon={<AtSignIcon />}>Wallet</MenuItem>
              <MenuItem h="70px">
                <LoginItem mobile />
              </MenuItem>
            </MenuList>
          </>
        )}
      </Menu>
    </Flex>
  </Flex>
)

export const NavigationBar = (): JSX.Element => {
  return <Flex 
    display={{ base: 'none' , md: 'flex' }}
    w="100%"
    justifyContent="center"
    h="120px"
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

      <NavigationItem name="Wallet" active />
      <LoginItem />
    </Flex>
  </Flex>
}