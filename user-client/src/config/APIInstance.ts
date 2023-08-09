import axios from 'axios';
import { ROUTES, SERVER_URL } from './const';
import AuthService from '../services/auth.service';

const APIInstance = axios.create({
	baseURL: SERVER_URL,
	headers: {
		'Content-Type': 'application/json',
		Accept: 'application/json',
	},
	withCredentials: true,
});

APIInstance.interceptors.response.use(
	async (response) => response,
	async (error) => {
		const originalRequest = error.config;

		if (getStatus(error) === 401 && !originalRequest._retry) {
			originalRequest._retry = true;
			const userAuthenticated = await AuthService.getInstance().refreshToken();
			if (userAuthenticated === true) {
				return APIInstance(originalRequest);
			} else {
				window.location.href = ROUTES.LOGIN;
			}
		}

		return Promise.reject(error);
	}
);

const getStatus = (error: any) => {
	if (error && error.response) {
		return error.response.status;
	}
	return 0;
};

export default APIInstance;
