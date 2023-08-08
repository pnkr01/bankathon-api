import React from 'react';
import { NavigationDrawer } from '../../components/navigation-drawer';
import { Box } from '@chakra-ui/react';
import { Navigate, useOutlet } from 'react-router-dom';
import { ROUTES } from '../../../config/const';

export default function Home() {
	const outlet = useOutlet();

	if (!outlet) {
		return <Navigate to={ROUTES.JOB_LISTINGS} />;
	}

	return (
		<>
			<NavigationDrawer />

			<Box marginLeft='50px'>{outlet}</Box>
		</>
	);
}
