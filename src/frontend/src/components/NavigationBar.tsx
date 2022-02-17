import { Flex, Image, Text } from '@chakra-ui/react'

import React from 'react'

interface ItemProps {
	name: string
	active?: boolean
}

const NavigationItem = ({ name, active }: ItemProps): JSX.Element => (
	<Text
		color={active ? "brand" : "white"}
		fontSize="1.2em"
		fontWeight="bold"
		m="20px"
		p="10px"
		w="170px"
		textAlign="center"
		borderRadius="50px"
		cursor="pointer"
		backgroundColor={active ? "black" : "none"}
	>{name}</Text>	
)

const NavigationBar = (): JSX.Element => (
	<Flex 
		w="100%"
		justifyContent="center"
	>
		<Flex
			direction="row"
			alignItems="center"
			borderRadius="50px"
			backgroundColor="gray.700"
			m="10px 20px"
			padding="0 30px"
			h="70px"
		>
			<NavigationItem name="wallet" active />
			<Image 
				src="monetae-logo.svg"
			/>
			<NavigationItem name="governance" />
		</Flex>
	</Flex>
)

export default NavigationBar