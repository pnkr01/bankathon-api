import { CloseIcon, SearchIcon } from '@chakra-ui/icons';
import { Box, Input, InputGroup, InputLeftElement, InputRightElement } from '@chakra-ui/react';
import React from 'react';
import { COLORS } from '../../../../config/const';

type Props = {
	searchText: string;
	setSearchText: (text: string) => void;
};

export default function SearchField({ searchText, setSearchText }: Props) {
	return (
		<Box width='300px'>
			<InputGroup width='full' bg={COLORS.WHITE} rounded='xl' shadow='sm'>
				<InputLeftElement pointerEvents='none'>
					<SearchIcon color={COLORS.SECONDARY} />
				</InputLeftElement>
				<Input
					value={searchText}
					onChange={(e) => setSearchText(e.target.value)}
					placeholder='Search here...'
					borderColor={COLORS.BACKGROUND_DARK}
					focusBorderColor={COLORS.BACKGROUND_DARK}
					color={COLORS.SECONDARY}
					_placeholder={{
						color: COLORS.BACKGROUND_DARK,
						opacity: 1,
					}}
				/>
				<InputRightElement
					_hover={{
						cursor: 'pointer',
					}}
					hidden={searchText === ''}
					onClick={() => setSearchText('')}
				>
					<CloseIcon boxSize={3} color={COLORS.SECONDARY} />
				</InputRightElement>
			</InputGroup>
		</Box>
	);
}
