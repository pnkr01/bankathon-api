import { Box } from '@chakra-ui/react';
import React from 'react';
import { COLORS } from '../../../../config/const';

export default function Divider() {
	return (
		<Box
			width='40px'
			marginX='0'
			height='2px'
			opacity='0.75'
			marginTop='-5px'
			marginBottom='10px'
			rounded='full'
			bg={COLORS.OFF_WHITE}
			className='group-hover:w-[160px] group-hover:mx-[10px] transition-all'
		/>
	);
}
