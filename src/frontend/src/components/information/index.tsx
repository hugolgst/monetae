import './carousel.css'

import { Box, Flex, Text, chakra } from '@chakra-ui/react'

import React from 'react'

const InformationBar = (): JSX.Element => {
  return <Flex
    overflow="hidden"
    alignItems="center"
    h="60px"
    w={{ base: '100%', md: '60%' }}
  >
    <Flex
      direction="row"
      alignItems="center"
    >
      {[1, 2].map(i => (<Text 
        key={i}
        fontFamily="moranga"
        fontSize="1.3em"
        whiteSpace="nowrap"
        animation={`scrolling-left${i} 20s linear infinite`}
        style={{
          animationDelay: `${(i-1)*10}s`
        }}
      >
        <chakra.span fontStyle="italic" color="gray.500" mr="15px">Latest updates:</chakra.span>
        <chakra.span mr="15px">”Set ICO goal to 2’000 ICP” accepted. <chakra.span color="green">yes 67%</chakra.span> / <chakra.span color="red">no 33%</chakra.span>.</chakra.span>
        <chakra.span mr="15px">”Extend working partnership with XXX” has been proposed for the 1th of March 2022.</chakra.span>
      </Text>))}
    </Flex>
  </Flex>
}

export default InformationBar