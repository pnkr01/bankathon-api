import { Box, Image } from '@chakra-ui/react';
import { LOGO } from '../../../assets/Images';
import { COLORS } from '../../../config/const';

export default function LoadingPage() {
	return (
		<Box
			bg={COLORS.PRIMARY_BACKGROUND}
			width='100vw'
			height='100vh'
			padding={4}
			color='white'
			className='select-none center'
		>
			<Box>
				<Image src={LOGO} alt='Loading' height='6rem' className='animate-pulse' />
			</Box>
		</Box>
	);
}
