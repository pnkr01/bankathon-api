import { AuthStatus } from '../reducers/AuthReducer';

type AuthState = {
	email: string;
	otp: string[];
	status: AuthStatus;
	error: string;
	isLoading: boolean;
};

export default AuthState;
