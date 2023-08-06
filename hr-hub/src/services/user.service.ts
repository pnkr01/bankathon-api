import axios from 'axios';
import APIInstance from '../config/APIInstance';

type UpdateProps = {
	phone: string;
	first_name: string;
	last_name: string;
	email: string;
	gender: string;
	dob: string;
};

export default class UserService {
	private static instance: UserService;

	private constructor() {
		// singleton
	}

	static getInstance(): UserService {
		if (!UserService.instance) {
			UserService.instance = new UserService();
		}
		return UserService.instance;
	}

	async getUsers() {
		try {
			const { data } = await APIInstance.get('/u/profile/all-users');
			if (data.success) {
				return Promise.resolve(data.users);
			} else {
				throw new Error('Error fetching users');
			}
		} catch (e) {
			let error = 'Error fetching users';
			if (axios.isAxiosError(e)) {
				if (e.code === 'ERR_NETWORK') {
					error = 'No internet connection';
				}
			}
			return Promise.reject(error);
		}
	}

	async getUser(id: string) {
		try {
			const { data } = await APIInstance.get(`/u/profile/${id}`);

			if (data.success) {
				return Promise.resolve(data.profile);
			} else {
				throw new Error('Error fetching user details.');
			}
		} catch (e) {

			let error = 'Error fetching user details.';
			if (axios.isAxiosError(e)) {
				if (e.code === 'ERR_NETWORK') {
					error = 'No internet connection';
				}
			}
			return Promise.reject(error);
		}
	}

	async updateUser(id: string, args: UpdateProps) {
		try {
			const { data } = await APIInstance.patch(`/u/profile/${id}`, args);
			if (data.success) {
				return Promise.resolve();
			} else {
				throw new Error('Error updating user details.');
			}
		} catch (e) {
			let error = 'Error updating user details.';
			if (axios.isAxiosError(e)) {
				if (e.code === 'ERR_NETWORK') {
					error = 'No internet connection';
				}
				if (e.response) {
					const { title } = e.response.data;
					if (title === 'INVALID_FIELDS') {
						error = 'Please provide all the necessary information.';
					}
				}
			}
			return Promise.reject(error);
		}
	}

	getKYCResource(
		filename: string,
		onSuccess = (url: string | ArrayBuffer | null) => {},
		onError = () => {}
	) {
		APIInstance.get(`/u/profile/static/resources/${filename}`, {
			responseType: 'blob',
		})
			.then(({ data }) => {
				var reader = new window.FileReader();
				reader.readAsDataURL(data);
				reader.onload = function () {
					var imageDataUrl = reader.result;
					onSuccess(imageDataUrl);
				};
			})
			.catch(() => onError());
	}
}
