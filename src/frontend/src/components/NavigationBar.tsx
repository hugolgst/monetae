import { Flex, Image, Text } from '@chakra-ui/react'

import React from 'react'

interface ItemProps {
	name: string
	active?: boolean
	left?: boolean
}

const NavigationItem = ({ name, active, left }: ItemProps): JSX.Element => (
	<Text
		color={active ? "brand.600" : "gray"}
		fontSize="1.2em"
		fontWeight="bold"
		m="20px"
		p="10px"
		w="170px"
		textAlign="center"
		borderRadius="50px"
		cursor="pointer"
		ml={left ? 'auto' : ''}
	>{name}</Text>	
)

const NavigationBar = (): JSX.Element => (
	<Flex 
		w="100%"
		justifyContent="center"
		h="120px"
	>
		<Flex
			w="80%"
			direction="row"
			alignItems="center"
		>
			<Image 
				src="monetae-logo.svg"
				w="180px"
			/>
			<NavigationItem name="wallet" active />
			<NavigationItem name="governance" />
			<NavigationItem name="login" left />
		</Flex>
	</Flex>
)

export default NavigationBar