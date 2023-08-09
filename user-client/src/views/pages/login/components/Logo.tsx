import { Box, Center, Flex, Image, Text } from '@chakra-ui/react';
import { LOGO } from '../../../../assets/Images';
import { COLORS } from '../../../../config/const';

export default function Logo() {
	return (
		<Center>
			<Box>
				<Flex alignItems={'center'} justifyItems={'center'}>
					<Image src={LOGO} w='35px' h='35px' />
					<Text
						bgClip='text'
						fontSize='5xl'
						fontWeight='bold'
						bgGradient={COLORS.GRADIENT_PRIMARY_SECONDARY}
					>
						HR Hub
					</Text>
				</Flex>
			</Box>
		</Center>
	);
}
