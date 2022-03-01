import { AlertDialog, AlertDialogBody, AlertDialogCloseButton, AlertDialogContent, AlertDialogFooter, AlertDialogHeader, AlertDialogOverlay, Button, useToast } from '@chakra-ui/react'
import { IdentityContext, queryClient } from '../../App'
import React, { useContext, useRef } from 'react'

import { Principal } from '@dfinity/principal'
import { useTokenData } from '../../hooks/metadata'

interface AlertProps {
  amount: number
  address: string
  resetFields: () => void
  disclosure: {
    isOpen: boolean;
    onOpen: () => void;
    onClose: () => void;
    onToggle: () => void;
    isControlled: boolean;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    getButtonProps: (props?: any) => any;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    getDisclosureProps: (props?: any) => any;
  }
}

const Alert = ({ amount, address, disclosure, resetFields }: AlertProps): JSX.Element => {
  const [ actor ] = useContext(IdentityContext).actor
  const { isOpen, onClose } = disclosure
  const toast = useToast()
  const { symbol, decimals } = useTokenData()
  const cancelRef = useRef()

  const transfer = async () => {
    const status = await actor.transfer(Principal.fromText(address), BigInt(Number(amount) * 10**decimals))

    if (status) {
      toast({
        title: 'Transaction executed successfully.',
        status: 'success',
        isClosable: true
      })

      queryClient.invalidateQueries('balance')

      resetFields()
    } else {
      toast({
        title: 'Error happened in transaction.',
        status: 'error',
        isClosable: true
      })
    }
  }

  return <AlertDialog
    motionPreset='slideInBottom'
    leastDestructiveRef={cancelRef}
    onClose={onClose}
    isOpen={isOpen}
    isCentered
  >
    <AlertDialogOverlay />

    <AlertDialogContent>
      <AlertDialogHeader>Discard Changes?</AlertDialogHeader>
      
      <AlertDialogCloseButton />
      
      <AlertDialogBody>
        Are you sure you want to transfer {symbol} {amount} to {address}?
        This action is irreversible.
      </AlertDialogBody>
      
      <AlertDialogFooter>
        <Button ref={cancelRef} onClick={onClose}>
          No
        </Button>
        <Button 
          colorScheme='red' 
          ml={3}
          onClick={() => {
            if (!decimals) return
            if (isNaN(Number(amount))) return

            transfer()
          }}
        >
          Yes
        </Button>
      </AlertDialogFooter>
    </AlertDialogContent>
  </AlertDialog>
}

export default Alert