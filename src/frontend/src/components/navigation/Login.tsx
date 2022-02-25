import { AtSignIcon } from '@chakra-ui/icons'
import { Button } from '@chakra-ui/react'
import React, { useContext } from 'react'
import { NavigationItem } from '.'
import { IdentityContext } from '../../App'
import { useAuthentication } from '../../hooks/authentication'

const LoginItem = ({ mobile }: { mobile?: boolean }): JSX.Element => {
  const { logged, login } = useAuthentication()
  const [ identity ] = useContext(IdentityContext).identity

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
    <Button ml={mobile ? '' : 'auto'} onClick={login}>
      Login
    </Button>
}

export default LoginItem