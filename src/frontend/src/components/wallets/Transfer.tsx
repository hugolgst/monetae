import React, { useContext, useEffect, useState } from 'react'

import {
  Text,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  Button,
  Input,
  InputGroup,
  InputLeftElement,
  useToast,
  Flex,
} from '@chakra-ui/react'
import { ArrowForwardIcon, AtSignIcon } from '@chakra-ui/icons'
import { IdentityContext } from '../../App'
import { Principal } from '@dfinity/principal'
import useTokenData from '../../hooks/metadata'

type ModalProps = {
  disclosure: {
    isOpen: boolean;
    onOpen: () => void;
    onClose: () => void;
    onToggle: () => void;
    isControlled: boolean;
    getButtonProps: (props?: any) => any;
    getDisclosureProps: (props?: any) => any;
  }
}

const TransferModal = ({ disclosure }: ModalProps): JSX.Element => {
  const { isOpen, onClose } = disclosure
  const toast = useToast()
  const [ actor ] = useContext(IdentityContext).actor
  const [ principal, setPrincipal ] = useState<string>()
  const [ amount, setAmount ] = useState<string>('0')
  const { decimals, fee, symbol } = useTokenData()

  return <Modal 
    isOpen={isOpen} 
    onClose={onClose}
    isCentered
  >
    <ModalOverlay />

    <ModalContent>
      <ModalHeader>Transfer</ModalHeader>

      <ModalCloseButton />

      <ModalBody>
        <InputGroup>
          <InputLeftElement
            pointerEvents='none'
          >
            <AtSignIcon />
          </InputLeftElement>

          <Input 
            placeholder='Principal ID' 
            value={principal}
            onChange={(e) => {
              setPrincipal(e.target.value)
            }}
          />
        </InputGroup>

        <Flex justifyContent="space-between">
          <Input 
            mt="10px"
            w="200px"
            placeholder="Amount" 
            value={amount}
            onChange={(e) => {
              setAmount(e.target.value)
            }}
          />

          <Text w="max-content"> + {fee / 10 ** decimals} = </Text>

          <Input 
            mt="10px"
            placeholder="Amount" 
            w="100px"
            value={Number(amount) + (fee / 10 ** decimals)}
            onChange={(e) => {
              setAmount(`${Number(e.target.value) - (fee / 10 ** decimals)}`)
            }}
          />

          <Text>{symbol}</Text>
        </Flex>

        <Text fontSize="0.8em" color="gray.300">The fee applied is a flat rate of {fee / 10 ** decimals} {symbol}.</Text>
      </ModalBody>

      <ModalFooter>
        <Button 
          rightIcon={<ArrowForwardIcon />}
          onClick={() => {
            if (!decimals) return
            if (isNaN(Number(amount))) return

            const transfer = async () => {
              const status = actor.transfer(Principal.fromText(principal), BigInt(Number(amount) * 10**decimals))

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
        >Transfer funds</Button>
      </ModalFooter>
    </ModalContent>
  </Modal>
}

export default TransferModal