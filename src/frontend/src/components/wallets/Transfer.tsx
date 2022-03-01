import { ArrowForwardIcon, AtSignIcon } from '@chakra-ui/icons'
import {
  Button,
  Flex,
  Heading,
  Input,
  InputGroup,
  InputLeftElement,
  Text,
  useToast,
} from '@chakra-ui/react'
import React, { useContext, useState } from 'react'

import { IdentityContext } from '../../App'
import { Principal } from '@dfinity/principal'
import { useTokenData } from '../../hooks/metadata'

const Transfer = (): JSX.Element => {
  const toast = useToast()
  const [ actor ] = useContext(IdentityContext).actor
  const [ principal, setPrincipal ] = useState<string>()
  const [ amount, setAmount ] = useState<string>('0')
  const { decimals, fee, symbol } = useTokenData()

  return <Flex 
    w="100%"
    p="30px"
    direction="column"
  >
    <Heading 
      size="lg"
      mb="15px"
    >Transfer funds</Heading>

    <InputGroup>
      <InputLeftElement
        pointerEvents='none'
      >
        <AtSignIcon />
      </InputLeftElement>

      <Input 
        variant="solid"
        placeholder='Address' 
        value={principal}
        onChange={(e) => {
          setPrincipal(e.target.value)
        }}
      />
    </InputGroup>

    <Flex 
      mt="10px" 
      alignItems="center" 
      justifyContent="space-between"
      gap="10px"
    >
      <Text fontWeight="600">{symbol ? symbol : 'MAE'}</Text>

      <Input 
        variant="solid"
        placeholder="Amount" 
        value={amount}
        onChange={(e) => {
          setAmount(e.target.value)
        }}
      />

      <Text 
        fontWeight="600"
        whiteSpace="nowrap"
      > + {fee / 10.0 ** decimals}</Text>
    </Flex>

    <Text fontSize="0.8em" color="gray.300">The fee applied is a flat rate of {fee / 10.0 ** decimals} {symbol}.</Text>

    <Button 
      mt="15px"
      ml="auto"
      w="max-content"
      rightIcon={<ArrowForwardIcon />}
      onClick={() => {
        if (!decimals) return
        if (isNaN(Number(amount))) return

        const transfer = async () => {
          const status = await actor.transfer(Principal.fromText(principal), BigInt(Number(amount) * 10**decimals))

          if (status) {
            toast({
              title: 'Transaction executed successfully.',
              status: 'success',
              isClosable: true
            })
          } else {
            toast({
              title: 'Error happened in transaction.',
              status: 'error',
              isClosable: true
            })
          }
        }

        transfer()
      }}
    >Send</Button>
  </Flex>
}

export default Transfer