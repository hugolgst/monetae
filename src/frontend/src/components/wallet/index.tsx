import { AddIcon, AtSignIcon } from '@chakra-ui/icons'
import { Box, Button, Flex, Heading, Text, chakra } from '@chakra-ui/react'

import React from 'react'

const HeroTitle = ({ title, sizes, value }: {
	title: string,
	sizes: [string, string],
	value: number
}): JSX.Element => (
	<Flex>
		<Heading fontSize={sizes[0]}>{title}</Heading>
		<Funds value={value} sizes={sizes} />
	</Flex>
)

const Wallet = (): JSX.Element => (
	<Flex
		borderRadius="10px"
		bgColor="gray.100"
		w="100%"
		h="160px"
		justifyContent="space-between"
		p="30px"
		direction="column"
	>
		<HeroTitle title="Main" value={23} sizes={["xl", "xs"]} />
		<Text><AtSignIcon /> kp36f-wbon5-rq45k-vo3r3-fjwqq-jxufl-znnnn-5k35g-7xugj-ggthi-mqe</Text>
		<Flex>
			<Text color="gray.500">voting weight: 27.4</Text>
			<Text color="gray.500" ml="auto">click to copy</Text>
		</Flex>
	</Flex>
)

const Funds = ({ value, sizes }: {
	value: number,
	sizes: [string, string]
}): JSX.Element => (
	<Heading
		fontSize={sizes[0]}
		ml="auto"
	>
		{value} <chakra.span fontSize={sizes[1]} fontWeight="normal">MAE</chakra.span>
	</Heading>
)

const Wallets = (): JSX.Element => {
	return <Flex
		w="100%"
		h="80vh"
		justifyContent="center"
	>
		<Flex 
			direction="column"
			w="40%"
			h="100%"
			justifyContent="center"
			alignItems="center"
		>
			<Box m="5% 0" w="100%">
				<HeroTitle title="Account" value={23} sizes={["4xl", "md"]} />
			</Box>

			<Wallet />

			<Button 
				w="max-content"
				leftIcon={<AddIcon />}
				size="lg"
				mt="auto"
			>Add wallet</Button>
		</Flex>
	</Flex>
}

export default Wallets