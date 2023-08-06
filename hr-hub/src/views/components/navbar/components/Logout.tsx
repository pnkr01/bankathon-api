import { Flex, Image, Text } from '@chakra-ui/react';
import { useNavigate } from 'react-router-dom';
import { PROFILE } from '../../../../assets/Images';
import { COLORS, ROUTES } from '../../../../config/const';
import AuthService from '../../../../services/auth.service';

export default function Logout() {
	const navigate = useNavigate();

	const handleClick = () => {
		const authService = AuthService.getInstance();
		authService.logout();
		navigate(ROUTES.LOGIN);
	};

	return (
		<Flex
			alignItems='center'
			gap='5px'
			_hover={{
				cursor: 'pointer',
			}}
			onClick={handleClick}
		>
			<Image src={PROFILE} />
			<Text color={COLORS.SECONDARY}>Logout</Text>
		</Flex>
	);
}
