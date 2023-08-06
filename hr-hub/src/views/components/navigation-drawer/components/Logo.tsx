import { Text, Image, Flex } from '@chakra-ui/react';
import { COLORS } from '../../../../config/const';
import { LOGO } from '../../../../assets/Images';

export default function Logo() {
	return (
		<Flex
			justifyContent='center'
			alignItems='center'
			width={'40px'}
			height='50px'
			className='transition-all group-hover:w-[180px]'
		>
			<Image src={LOGO} alt='logo' width='30px' height='30px' />
			<Text
				fontSize='2xl'
				fontWeight='bold'
				mx={1}
				color={COLORS.SECONDARY}
				className='hidden group-hover:block transition-all'
			>
				
			</Text>
		</Flex>
	);
}
