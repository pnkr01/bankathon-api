import axios from 'axios';
import APIInstance from '../config/APIInstance';

export default class AuthService {
	private static instance: AuthService;

	private constructor() {
		// singleton
	}

	static getInstance(): AuthService {
		if (!AuthService.instance) {
			AuthService.instance = new AuthService();
		}
		return AuthService.instance;
	}

	async login(email: string) {
		try {
			const { data } = await APIInstance.post('/u/auth/login', {
				email,
				role: 'HR',
			});
			if (data.success) {
				return Promise.resolve();
			} else {
				throw new Error('Error sending OTP');
			}
		} catch (e) {
			let error = 'Error sending OTP';
			if (axios.isAxiosError(e)) {
				if (e.code === 'ERR_NETWORK') {
					error = 'No internet connection';
				}
				if (e.response) {
					const { title } = e.response.data;
					if (title === 'INACTIVE_ACCOUNT_ERROR') {
						error = 'Your account is inactive. ';
					} else if (title === 'INVALID_PHONE_AND_ROLE_ERROR') {
						error = 'Invalid phone number';
					} else if (title === 'INTERNAL_SERVER_ERROR') {
						error = 'Unable to login. Please try again later';
					}
				}
			}
			return Promise.reject(error);
		}
	}

	async verifyOTP(otp: string) {
		try {
			const { data } = await APIInstance.post('/u/auth/verify-login', {
				otp,
			});

			if (data.success) {
				return Promise.resolve();
			} else {
				throw new Error('Error verifying OTP');
			}
		} catch (e) {
			let error = 'Error verifying OTP';
			if (axios.isAxiosError(e)) {
				if (e.response) {
					const { title } = e.response.data;
					if (title === 'INVALID_OTP_ERROR') {
						error = 'Invalid OTP.';
					} else if (title === 'INVALID_PHONE_AND_ROLE_ERROR') {
						error = 'Invalid phone number';
					} else if (title === 'INTERNAL_SERVER_ERROR') {
						error = 'Unable to login. Please try again later';
					}
				}
			}
			return Promise.reject(error);
		}
	}

	async refreshToken(): Promise<boolean> {
		try {
			const { data } = await APIInstance.post('/u/auth/refresh-token');
			return data.success;
		} catch (e) {
			return false;
		}
	}

	async logout() {
		try {
			await APIInstance.post('/u/auth/logout');
		} catch (e) {}
	}
}
