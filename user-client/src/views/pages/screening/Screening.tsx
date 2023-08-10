import {
	Alert,
	AlertIcon,
	Box,
	Flex,
	Table,
	TableContainer,
	Tbody,
	Th,
	Thead,
	Tr,
} from '@chakra-ui/react';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useOutlet } from 'react-router-dom';
import { COLORS } from '../../../config/const';
import { NAVBAR_SAFE_AREA } from '../../../config/ui';
import { StoreNames } from '../../../store';
import {
	reset,
	setJobs,
	setSearchText,
	setErrorFetchingJobDetails,
} from '../../../store/reducers/ScreeningReducer';
import StoreState from '../../../types/store';
import { Navbar } from '../../components/navbar';
import ApplicantCard from './components/ApplicantCard';
import JobService from '../../../services/job.service';

export default function Screening() {
	const { filteredJobs, searchText, errorFetchingJobDetails, errorFetchingJobs, errorSavingData } =
		useSelector((state: StoreState) => state[StoreNames.SCREENING]);
	const dispatch = useDispatch();
	const outlet = useOutlet();

	useEffect(() => {
		dispatch(reset());
		JobService.getInstance()
			.getScreenings()
			.then((result) => dispatch(setJobs(result)))
			.catch((err) => {
				dispatch(setErrorFetchingJobDetails(err));
				setTimeout(() => {
					dispatch(setErrorFetchingJobDetails(''));
				}, 4000);
			});
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
					<Navbar.Title text='Applicants' />
				</Flex>
			</Navbar>

			<Box {...NAVBAR_SAFE_AREA} bg={COLORS.PRIMARY_BACKGROUND}>
				<Box marginX='50px'>
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
									<Th color={COLORS.SECONDARY}>JOB TITLE</Th>
									<Th color={COLORS.SECONDARY}>JOB ROLE</Th>
									<Th color={COLORS.SECONDARY}>STATUS</Th>
									<Th color={COLORS.SECONDARY} textAlign={'center'}>
										ACTION
									</Th>
								</Tr>
							</Thead>
							<Tbody>
								{filteredJobs.map((applicants, index) => (
									<ApplicantCard key={index} sno={index + 1} {...applicants} />
								))}
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
