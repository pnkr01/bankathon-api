import { Box, Flex } from '@chakra-ui/react';
import { COLORS } from '../../../../config/const';

type Props = {
	isActive?: boolean;
	onToggle?: () => void;
};

export default function Switch({ isActive = false, onToggle = () => {} }: Props) {
	return (
		<Flex
			height='18px'
			width='30px'
			borderWidth='2px'
			borderColor={isActive ? COLORS.SECONDARY : COLORS.GRAY}
			rounded='full'
			alignItems='center'
			paddingX='2px'
			_hover={{ cursor: 'pointer' }}
			onClick={onToggle}
			transition={'all 0.2s '}
			justifyContent={isActive ? 'flex-end' : 'flex-start'}
		>
			<Box
				height='10px'
				width='10px'
				rounded='full'
				bg={isActive ? COLORS.SECONDARY : COLORS.GRAY}
			/>
		</Flex>
	);
}
