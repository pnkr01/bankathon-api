import React, { useEffect } from 'react';
import AuthService from '../services/auth.service';

export default function useAuth() {
	const [isLoggedIn, setLoggedIn] = React.useState(false);
	const [isLoading, setLoading] = React.useState(true);

	const checkLoginStatus = async () => {
		setLoading(true);
		try {
			const logged = await AuthService.getInstance().refreshToken();
			setLoggedIn(logged);
		} catch (err: any) {
			setLoggedIn(false);
		} finally {
			setLoading(false);
		}
	};

	useEffect(() => {
		checkLoginStatus();
	}, []);

	return [isLoggedIn, isLoading];
}
