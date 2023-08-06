import { Box, VStack } from '@chakra-ui/react';
import { useMemo } from 'react';
import { useLocation } from 'react-router-dom';
import { JOB_OFFER, USERS } from '../../../assets/Images';
import { COLORS, ROUTES } from '../../../config/const';
import Divider from './components/Divider';
import DrawerMenu from './components/DrawerMenu';
import Logo from './components/Logo';

export default function NavigationDrawer() {
	const location = useLocation();

	const activeMenu = useMemo(() => {
		const path = location.pathname;
		if (path.startsWith(ROUTES.JOB_LISTINGS)) {
			return ROUTES.JOB_LISTINGS;
		} else if (path.startsWith(ROUTES.USERS)) {
			return ROUTES.USERS;
		} else if (path.startsWith(ROUTES.SMART_CONTRACT)) {
			return ROUTES.SMART_CONTRACT;
		} else if (path.startsWith(ROUTES.INVESTMENT)) {
			return ROUTES.INVESTMENT;
		} else if (path.startsWith(ROUTES.NOTES)) {
			return ROUTES.NOTES;
		} else if (path.startsWith(ROUTES.BUGS)) {
			return ROUTES.BUGS;
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
						title='Job Listings'
						isActive={activeMenu === ROUTES.JOB_LISTINGS}
						navigateTo={ROUTES.JOB_LISTINGS}
					/>
					<DrawerMenu
						icon={USERS}
						title='Users'
						isActive={activeMenu === ROUTES.USERS}
						navigateTo={ROUTES.USERS}
					/>
					{/* todo: change icon for smart contract */}
					<DrawerMenu
						icon={USERS}
						title='Smart Contract'
						isActive={activeMenu === ROUTES.SMART_CONTRACT}
						navigateTo={ROUTES.SMART_CONTRACT}
					/>
					{/* todo: change icon for Investment */}
					<DrawerMenu
						icon={USERS}
						title='Investment'
						isActive={activeMenu === ROUTES.INVESTMENT}
						navigateTo={ROUTES.INVESTMENT}
					/>
					{/* todo: change icon for Notes */}
					<DrawerMenu
						icon={USERS}
						title='Notes'
						isActive={activeMenu === ROUTES.NOTES}
						navigateTo={ROUTES.NOTES}
					/>
					{/* todo: change icon for bugs */}
					<DrawerMenu
						icon={USERS}
						title='Bugs'
						isActive={activeMenu === ROUTES.BUGS}
						navigateTo={ROUTES.BUGS}
					/>
				</VStack>
			</Box>
		</>
	);
}
