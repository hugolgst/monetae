import { Button, Text } from '@chakra-ui/react'
import React, { useContext } from 'react'

import { IdentityContext } from '../../App'
import { useAuthentication } from '../../hooks/authentication'

const LoginItem = ({ mobile }: { mobile?: boolean }): JSX.Element => {
  const { logged, login } = useAuthentication()
  const [ identity ] = useContext(IdentityContext).identity

  const getFirstChars = (text: string): string => {
    return `${text.slice(0, 8)}...`
  }

  return logged && identity ? 
    <Text ml="auto">{getFirstChars(identity.getPrincipal().toString())} </Text>
    : 
    <Button ml={mobile ? '' : 'auto'} onClick={login}>
      Login
    </Button>
}

export default LoginItem