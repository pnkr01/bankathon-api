import { Text } from '@chakra-ui/react';
import React from 'react';
import { COLORS } from '../../../../config/const';

type Props = {
	text: string;
};

export default function Title({ text }: Props) {
	return (
		<Text fontSize='2xl' fontWeight='bold' color={COLORS.NAVBAR}>
			{text}
		</Text>
	);
}
