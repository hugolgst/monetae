import React, { useContext, useEffect, useState } from 'react'

import {
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
} from '@chakra-ui/react'
import { ArrowForwardIcon, AtSignIcon } from '@chakra-ui/icons'
import { IdentityContext } from '../../App'
import { Principal } from '@dfinity/principal'

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
  const [ principal, setPrincipal ] = useState<string>()
  const [ amount, setAmount ] = useState<string>()
  const [ actor ] = useContext(IdentityContext).actor
  const toast = useToast()
  const [ decimals, setDecimals ] = useState<number>()

  useEffect(() => {
    if (actor) actor.decimals().then(_decimals => setDecimals(_decimals))
  }, [ actor ])

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

        <Input 
          mt="10px"
          placeholder="Amount" 
          value={amount}
          onChange={(e) => {
            setAmount(e.target.value)
          }}
        />
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