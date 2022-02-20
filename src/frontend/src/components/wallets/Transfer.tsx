import React, { useContext, useState } from 'react'

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
  const [ amount, setAmount ] = useState<number>()
  const [ actor ] = useContext(IdentityContext).actor
  const toast = useToast()

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
            setAmount(Number(e.target.value))
          }}
        />
      </ModalBody>

      <ModalFooter>
        <Button 
          rightIcon={<ArrowForwardIcon />}
          onClick={() => {
            const getFunds = async (val: number) => {
              return val * 10 ** await actor.decimals()
            }

            const transfer = async () => {
              const newAmount = BigInt(await getFunds(amount))
              const status = actor.transfer(Principal.fromText(principal), newAmount)

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