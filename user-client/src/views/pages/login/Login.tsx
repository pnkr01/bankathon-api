import { Box, Button, Center, FormControl, FormErrorMessage, Text, VStack } from '@chakra-ui/react';
import { COLORS, ROUTES } from '../../../config/const';
import { Logo, OTPInput, EmailInput } from './components';
import { useDispatch, useSelector } from 'react-redux';
import { StoreNames, StoreState } from '../../../store';
import {
	AuthStatus,
	reset,
	setAuthError,
	setStatus,
	startLoading,
	stopLoading,
} from '../../../store/reducers/AuthReducer';
import { useEffect } from 'react';
import { WarningTwoIcon } from '@chakra-ui/icons';
import { useNavigate } from 'react-router-dom';
import AuthService from '../../../services/auth.service';

export default function Login() {
	const { email, otp, status, error, isLoading } = useSelector(
		(state: StoreState) => state[StoreNames.AUTH]
	);
	const dispatch = useDispatch();
	const authService = AuthService.getInstance();
	const navigate = useNavigate();

	const handleSubmit = () => {
		dispatch(startLoading());
		if (status === AuthStatus.OTP_NOT_SEND) {
			authService
				.login(email)
				.then(() => dispatch(setStatus(AuthStatus.OTP_SENT)))
				.catch((err: any) => dispatch(setAuthError(err)));
		} else if (status === AuthStatus.OTP_SENT) {
			authService
				.verifyOTP(otp.join(''))
				.then(() => dispatch(setStatus(AuthStatus.OTP_VERIFIED)))
				.catch((err: any) => dispatch(setAuthError(err)));
		} else {
			dispatch(stopLoading());
		}
	};

	useEffect(() => {
		if (status === AuthStatus.OTP_VERIFIED) {
			navigate(ROUTES.HOME);
			dispatch(reset());
		}
	}, [status, navigate, dispatch]);

	useEffect(() => {
		dispatch(startLoading());
		dispatch(reset());
		AuthService.getInstance()
			.refreshToken()
			.then((isLogged) => {
				if (isLogged) {
					navigate(ROUTES.HOME);
				}
			})
			.catch((err: any) => dispatch(stopLoading()));
	}, [dispatch, navigate]);

	return (
		<Box bg='#FFEEE2' w='100vw' h='100vh' p={4} color='white' className='select-none'>
			<Center w='100vw' h='100vh'>
				<VStack>
					<Logo />

					<Box>
						<Text fontSize='2xl' fontWeight='medium' color={COLORS.SECONDARY}>
							Sign In
						</Text>
					</Box>

					<FormControl isInvalid={!!error}>
						<Box width={'400px'} marginTop='10px'>
							<EmailInput />
							{status === AuthStatus.OTP_SENT && <OTPInput />}
						</Box>
						<Box width={'400px'} marginTop='10px'>
							<Button
								isLoading={isLoading}
								width='full'
								bgColor={COLORS.SECONDARY}
								opacity={0.85}
								_hover={{
									opacity: 1,
								}}
								loadingText={
									status === AuthStatus.OTP_VERIFIED ? 'Redirecting...' : 'Authenticating...'
								}
								color={'white'}
								spinnerPlacement='start'
								onClick={handleSubmit}
							>
								{status === AuthStatus.OTP_NOT_SEND && <Text color='white'>Send OTP</Text>}
								{status === AuthStatus.OTP_SENT && <Text color='white'>Verify OTP</Text>}
								{status === AuthStatus.OTP_VERIFIED && <Text color='white'>Redirecting...</Text>}
							</Button>
						</Box>
						{error && (
							<FormErrorMessage marginTop='7px' maxWidth='400px'>
								<Center gap='0.5rem' width='full'>
									<WarningTwoIcon w={4} h={4} color='red.500' />
									<Text textAlign='justify'>{error}</Text>
								</Center>
							</FormErrorMessage>
						)}
					</FormControl>
				</VStack>
			</Center>
		</Box>
	);
}
