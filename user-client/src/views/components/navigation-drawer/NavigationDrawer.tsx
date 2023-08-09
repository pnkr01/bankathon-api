import { Box, VStack } from '@chakra-ui/react';
import { useMemo } from 'react';
import { useLocation } from 'react-router-dom';
import { APPLICANTS, JOB_OFFER } from '../../../assets/Images';
import { COLORS, ROUTES } from '../../../config/const';
import Divider from './components/Divider';
import DrawerMenu from './components/DrawerMenu';
import Logo from './components/Logo';

export default function NavigationDrawer() {
	const location = useLocation();

	const activeMenu = useMemo(() => {
		const path = location.pathname;
		if (path.includes(ROUTES.JOB_LISTINGS)) {
			return ROUTES.JOB_LISTINGS;
		}
	}, [location.pathname]);

	return (
		<>
			<Box
				p='5px'
				width={'50px'}
				minHeight='100vh'
				position='fixed'
				color='white'
				top='0'
				bg={COLORS.NAVBAR}
				paddingY='20px'
				className='transition-all group hover:w-[200px] '
				zIndex={50}
			>
				<VStack width='50px' position='fixed' alignItems='flex-start'>
					<Logo />
					<Divider />

					<DrawerMenu
						icon={JOB_OFFER}
						title='Job Listing'
						isActive={activeMenu === ROUTES.JOB_LISTINGS}
						navigateTo={ROUTES.JOB_LISTINGS}
					/>
				</VStack>
			</Box>
		</>
	);
}
