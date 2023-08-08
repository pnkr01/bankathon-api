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
import { useOutlet } from 'react-router-dom';
import { COLORS } from '../../../config/const';
import { NAVBAR_SAFE_AREA } from '../../../config/ui';
import { StoreNames } from '../../../store';
import {
	reset,
	setErrorFetchingApplicants,
	setApplicants,
	setSearchText,
} from '../../../store/reducers/ApplicantsReducer';
import StoreState from '../../../types/store';
import { Navbar } from '../../components/navbar';
import ApplicantCard from './components/ApplicantCard';
import ApplicantService from '../../../services/applicant.service';

export default function Applicants() {
	const { filteredApplicants, searchText, errorFetchingApplicantDetails, errorFetchingApplicants } =
		useSelector((state: StoreState) => state[StoreNames.APPLICANTS]);
	const dispatch = useDispatch();
	const outlet = useOutlet();

	useEffect(() => {
		dispatch(reset());
		ApplicantService.getInstance()
			.getApplicants()
			.then((result) => {
				const applicants = result.map((applicant) => ({
					...applicant,
					job: {
						...applicant.job,
						enhanced_description: applicant.job.job_description,
						skill_set: applicant.job.skills.join(','),
					},
				}));
				dispatch(setApplicants(applicants));
			})
			.catch((err) => {
				dispatch(setErrorFetchingApplicants(err));
				setTimeout(() => {
					dispatch(setErrorFetchingApplicants(''));
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
									<Th color={COLORS.SECONDARY}>NAME</Th>
									<Th color={COLORS.SECONDARY}>JOB TITLE</Th>
									<Th color={COLORS.SECONDARY} textAlign={'center'}>
										ACTION
									</Th>
								</Tr>
							</Thead>
							<Tbody>
								{filteredApplicants.map((applicants, index) => (
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
				hidden={errorFetchingApplicantDetails === '' && errorFetchingApplicants === ''}
			>
				<AlertIcon />
				{errorFetchingApplicantDetails}
				{errorFetchingApplicants}
			</Alert>
			{outlet}
		</Box>
	);
}
