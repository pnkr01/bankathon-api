import { Flex, Image, Text } from '@chakra-ui/react';
import { useNavigate } from 'react-router-dom';
import { COLORS } from '../../../../config/const';

type Props = {
	isActive: boolean;
	navigateTo: string;
	icon: string;
	title: string;
};

export default function DrawerMenu({ isActive, navigateTo, icon, title }: Props) {
	const navigate = useNavigate();
	const handleClick = () => {
		navigate('/' + navigateTo);
	};

	return (
		<Flex
			alignItems='center'
			width='40px'
			paddingLeft='5px'
			height='45px'
			gap='10px'
			bg={isActive ? COLORS.OFF_WHITE : COLORS.NAVBAR}
			rounded='lg'
			onClick={handleClick}
			className='transition-all group-hover:w-[180px] group-hover:pl-[10px] hover:cursor-pointer'
		>
			<Image
				src={icon}
				width='30px'
				height='30px'
				className={!isActive ? 'grayscale' : 'grayscale-0'}
			/>
			<Text
				fontSize='medium'
				fontWeight='medium'
				textTransform={'capitalize'}
				color={isActive ? COLORS.SECONDARY : COLORS.OFF_WHITE}
				className='hidden group-hover:block transition-all'
			>
				{title}
			</Text>
		</Flex>
	);
}
