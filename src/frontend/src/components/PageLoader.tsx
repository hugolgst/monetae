import { Image, Center, CircularProgress } from '@chakra-ui/react'
import { motion } from 'framer-motion'

import React from 'react'

const PageLoader = (): JSX.Element => (
  <>
    <style>{`
    body {
      overflow: hidden;
    }
    `}</style>

    <Center 
      w="100vw"
      h="100vh"
      position="fixed"
      overflow="hidden"
      backgroundColor="white"
      zIndex="1000"
    >
      <motion.div
        initial={{ scale: 1, x: 0 }}
        animate={{ scale: 0.7, x: -68 }}
        transition={{
          type: 'spring',
          stiffness: 260,
          damping: 20,
          delay: 1,
          duration: 0.7
        }}
      >
        <CircularProgress 
          isIndeterminate 
          color="brand.500" 
          size={150}
          thickness="3px"
          capIsRound
        />  
      </motion.div>

      <motion.div
        initial={{ opacity: 0, x: 100 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{
          delay: 1
        }}
        style={{
          position: 'absolute'
        }}
      >
        <Image src="images/monetae-logo.svg" />
      </motion.div>
    </Center>
  </>
)

export default PageLoader