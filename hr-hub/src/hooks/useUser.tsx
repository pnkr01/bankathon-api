import React, { useEffect } from 'react';
import { User } from '../store/types/UserState';
import UserService from '../services/user.service';

export default function useUser(userID: string | null) {
	const [useUser, setUser] = React.useState({
		email: '',
		phone: '',
		first_name: '',
		last_name: '',
		gender: '',
		dob: '',
		photo: '',
		address: {
			care_of: '',
			country: '',
			district: '',
			landmark: '',
			locality: '',
			pincode: '',
			state: '',
			sub_district: '',
		},
	} as User);
	const [error, setError] = React.useState(null);
	const [isLoading, setLoading] = React.useState(true);

	const getUser = async (id: string | null) => {
		if (id === null) {
			setLoading(false);
			return;
		}
		setLoading(true);
		try {
			const user = await UserService.getInstance().getUser(id);
			setUser({ ...user, id });
		} catch (err: any) {
			setError(err);
		} finally {
			setLoading(false);
		}
	};

	useEffect(() => {
		getUser(userID);
	}, [userID]);

	return [useUser, isLoading, error] as [user: User, isLoading: boolean, error: string | null];
}
