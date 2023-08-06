import {
	Alert,
	AlertIcon,
	Box,
	Button,
	Flex,
	Table,
	TableContainer,
	Tbody,
	Text,
	Th,
	Thead,
	Tr,
} from '@chakra-ui/react';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useOutlet } from 'react-router-dom';
import { COLORS, ROUTES } from '../../../config/const';
import { NAVBAR_SAFE_AREA } from '../../../config/ui';
import { StoreNames } from '../../../store';
import { reset, setSearchText } from '../../../store/reducers/JobListingReducer';
import StoreState from '../../../types/store';
import { Navbar } from '../../components/navbar';
import { AddIcon } from '@chakra-ui/icons';
import ListingCard from './components/ListingCard';

export default function JobListings() {
	const { searchText, errorSavingData, errorFetchingJobDetails, errorFetchingJobs } = useSelector(
		(state: StoreState) => state[StoreNames.JOB_LISTING]
	);
	const dispatch = useDispatch();
	const outlet = useOutlet();
	const navigate = useNavigate();

	const addAthlete = () => {
		navigate(ROUTES.JOB_LISTINGS + '/create');
	};

	useEffect(() => {
		dispatch(reset());
		// AthleteService.getInstance()
		// 	.getAthletes()
		// 	.then((athletes) => {
		// 		dispatch(setAthletes(athletes));
		// 	})
		// 	.catch((err) => {
		// 		dispatch(setErrorFetchingAthletes(err));
		// 		setTimeout(() => {
		// 			dispatch(setErrorFetchingAthletes(''));
		// 		}, 4000);
		// 	});
	}, [dispatch]);

	return (
		<Box bg={COLORS.PRIMARY_BACKGROUND}>
			<Navbar
				action={
					<Navbar.Action>
						<Navbar.SearchField
							searchText={searchText}
							setSearchText={(value) => dispatch(setSearchText(value))}
						/>
						<Navbar.Logout />
					</Navbar.Action>
				}
			>
				<Flex alignItems='center' gap='10px'>
					<Navbar.Title text='Job Listing' />
				</Flex>
			</Navbar>

			<Box {...NAVBAR_SAFE_AREA} bg={COLORS.PRIMARY_BACKGROUND}>
				<Box marginX='50px'>
					<Flex justifyContent='flex-end' alignItems='center' marginY='10px'>
						<Button
							onClick={addAthlete}
							colorScheme='blue'
							variant='outline'
							leftIcon={<AddIcon />}
						>
							<Text>Add</Text>
						</Button>
					</Flex>

					<TableContainer
						bgColor={COLORS.WHITE}
						rounded='xl'
						shadow='md'
						maxHeight='calc(100vh - 180px)'
						overflowY='scroll'
					>
						<Table>
							<Thead bgColor={COLORS.LIGHT_GRAY}>
								<Tr>
									<Th color={COLORS.SECONDARY} isNumeric>
										SN
									</Th>
									<Th color={COLORS.SECONDARY}>TITLE</Th>
									<Th color={COLORS.SECONDARY}>ROLE</Th>
									<Th color={COLORS.SECONDARY}>JD PROCESSED</Th>
									<Th color={COLORS.SECONDARY}>STATUS</Th>
								</Tr>
							</Thead>
							<Tbody>
								<ListingCard
									key={0}
									id='athlete'
									name='Openings for Frontend Developer'
									jd_processed
									role='Frontend Developer'
									status='Active'
									sno={1}
								/>
							</Tbody>
						</Table>
					</TableContainer>
				</Box>
			</Box>
			<Alert
				status='error'
				position='fixed'
				bottom='0'
				zIndex={1000}
				hidden={
					errorFetchingJobDetails === '' && errorFetchingJobs === '' && errorSavingData === ''
				}
			>
				<AlertIcon />
				{errorFetchingJobDetails}
				{errorFetchingJobs}
				{errorSavingData}
			</Alert>
			{outlet}
		</Box>
	);
}
