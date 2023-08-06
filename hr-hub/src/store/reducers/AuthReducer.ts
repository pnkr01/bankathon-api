import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { AuthState } from '../types';
import { StoreNames } from '../config';

export enum AuthStatus {
	OTP_NOT_SEND = 'otp-not-send',
	OTP_SENT = 'otp-sent',
	OTP_VERIFIED = 'otp-verified',
}
const initialState: AuthState = {
	email: '',
	otp: ['', '', '', '', '', ''],
	status: AuthStatus.OTP_NOT_SEND,
	error: '',
	isLoading: false,
};

const AuthSlice = createSlice({
	name: StoreNames.AUTH,
	initialState,
	reducers: {
		reset: (state) => {
			state.email = initialState.email;
			state.otp = initialState.otp;
			state.status = initialState.status;
			state.error = initialState.error;

			state.isLoading = false;
		},
		setEmail: (state, action: PayloadAction<string>) => {
			state.email = action.payload;
			state.error = '';
		},

		resetOTP: (state) => {
			for (let i = 0; i < state.otp.length; i++) {
				state.otp[i] = initialState.otp[i];
			}
		},
		setOTP: (
			state,
			action: PayloadAction<{
				index: number;
				value: string;
			}>
		) => {
			if (action.payload.index < 0 || action.payload.index > initialState.otp.length - 1) {
				return;
			}
			if (action.payload.value === '') {
				state.otp[action.payload.index] = '';
				return;
			}

			const value = Number(action.payload.value) % 10;

			state.otp[action.payload.index] = value.toString();
			state.error = '';
		},
		setStatus: (state, action) => {
			if (!Object.values(AuthStatus).includes(action.payload)) {
				return;
			}
			state.status = action.payload;
			if (action.payload === AuthStatus.OTP_NOT_SEND) {
				state.otp = initialState.otp;
			}
			state.isLoading = false;
		},
		setAuthError: (state, action: PayloadAction<string>) => {
			state.error = action.payload;
			state.isLoading = false;
			state.otp = initialState.otp;
		},
		startLoading: (state, action: PayloadAction<void>) => {
			state.isLoading = true;
		},
		stopLoading: (state, action: PayloadAction<void>) => {
			state.isLoading = false;
		},
	},
});

export const {
	reset,
	setEmail,
	setStatus,
	setOTP,
	resetOTP,
	setAuthError,
	startLoading,
	stopLoading,
} = AuthSlice.actions;

export default AuthSlice.reducer;
