import { Box, Flex, VStack } from '@chakra-ui/react';
import React, { ReactNode } from 'react';
import { COLORS } from '../../../config/const';
import SearchField from './components/SearchField';
import Action from './components/Action';
import Logout from './components/Logout';
import Title from './components/Title';
import Switch from './components/Switch';

type Props = {
	children?: ReactNode;
	action?: ReactNode;
};

function Navbar({ children, action }: Props) {
	return (
		<VStack
			bg={COLORS.PRIMARY_BACKGROUND}
			position='fixed'
			width='calc(100vw - 50px)'
			height='75px'
			left='50px'
			top='0'
			zIndex={40}
		>
			<Box width='full' height='75px' alignItems='center'>
				<Flex justifyContent={'space-between'} alignItems={'center'} height='full' marginX='50px'>
					<Box>{children}</Box>
					<Box>{action}</Box>
				</Flex>
			</Box>
			<Box
				bgGradient={COLORS.GRADIENT_SEPARATOR}
				height='0.5px'
				width='calc(100vw - 150px)'
				position='fixed'
				top='75px'
			/>
		</VStack>
	);
}

Navbar.Action = Action;
Navbar.SearchField = SearchField;
Navbar.Logout = Logout;
Navbar.Title = Title;
Navbar.Switch = Switch;

export default Navbar;
