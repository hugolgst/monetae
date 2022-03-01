import { ArrowForwardIcon, AtSignIcon } from '@chakra-ui/icons'
import {
  Button,
  Flex,
  Heading,
  Input,
  InputGroup,
  InputLeftElement,
  Text,
  useDisclosure,
} from '@chakra-ui/react'
import React, { useState } from 'react'

import Alert from './Alert'
import { useTokenData } from '../../hooks/metadata'

const Transfer = (): JSX.Element => {
  const [ principal, setPrincipal ] = useState<string>()
  const [ amount, setAmount ] = useState<string>('0')
  const { decimals, fee, symbol } = useTokenData()
  const alertDisclosure = useDisclosure()
  const { onOpen } = alertDisclosure

  const resetFields = () => {
    setAmount(undefined)
    setPrincipal(undefined)
  }

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
      onClick={onOpen}
    >Send</Button>

    <Alert 
      amount={Number(amount)}
      address={principal}
      disclosure={alertDisclosure}
      resetFields={resetFields}
    />
  </Flex>
}

export default Transfer