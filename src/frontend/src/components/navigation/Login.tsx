import { AtSignIcon } from '@chakra-ui/icons'
import { Button } from '@chakra-ui/react'
import React from 'react'
import { NavigationItem } from '.'
import { useAuthentication } from '../../hooks/authentication'

const LoginItem = (): JSX.Element => {
  const { logged, identity, login } = useAuthentication()

  const getFirstChars = (text: string): string => {
    return `${text.slice(0, 8)}...`
  }

  return logged && identity ? 
    <NavigationItem 
      name={getFirstChars(identity.getPrincipal().toString())} 
      left 
      icon={AtSignIcon}
    /> 
    : 
    <Button ml="auto" onClick={login}>
      Login
    </Button>
}

export default LoginItem