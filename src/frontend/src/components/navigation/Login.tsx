import React from 'react'
import { NavigationItem } from '.'
import { useAuthentication } from '../../hooks/authentication'
import { Text } from '@chakra-ui/react'

const LoginItem = (): JSX.Element => {
  const { logged, identity, login } = useAuthentication()

  return logged ? 
    <NavigationItem 
      name={identity?.getPrincipal().toString() || 'none'} 
      left 
    /> 
    : 
    <NavigationItem 
      name="login" 
      left 
      onClick={login}
    />
}

export default LoginItem