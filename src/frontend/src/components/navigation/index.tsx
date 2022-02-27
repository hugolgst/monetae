import { AtSignIcon, CloseIcon, HamburgerIcon } from '@chakra-ui/icons'
import { Flex, Image, Menu, MenuButton, MenuItem, MenuList } from '@chakra-ui/react'

import LoginItem from './Login'
import React from 'react'

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

      <LoginItem />
    </Flex>
  </Flex>
}