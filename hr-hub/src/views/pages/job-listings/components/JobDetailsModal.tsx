import {
	Button,
	Modal,
	ModalBody,
	ModalCloseButton,
	ModalContent,
	ModalFooter,
	ModalHeader,
	ModalOverlay,
} from '@chakra-ui/react';
import { useNavigate, useOutlet, useParams } from 'react-router-dom';
import { ROUTES } from '../../../../config/const';
import JobDetails from './JobDetails';
import { LoadingDocsDialog } from '../../../components/dialog';
import { useCallback, useEffect } from 'react';
import { useJobDetails } from '../../../../hooks';
import {
	setErrorFetchingJobDetails,
	setSelectedJob,
} from '../../../../store/reducers/JobListingReducer';
import { useDispatch, useSelector } from 'react-redux';
import { StoreNames, StoreState } from '../../../../store';

export default function JobDetailsModal() {
	const navigate = useNavigate();
	const dispatch = useDispatch();
	const outlet = useOutlet();
	const { id: listingID } = useParams();

	const [jobDetail, isDetailsLoading, errorLoadingDetails] = useJobDetails(
		listingID && listingID !== 'create' ? listingID : null
	);

	const onClose = useCallback(() => {
		navigate(ROUTES.JOB_LISTINGS);
	}, [navigate]);

	useEffect(() => {
		if (isDetailsLoading) return;
		if (errorLoadingDetails) {
			dispatch(setErrorFetchingJobDetails(errorLoadingDetails));
			setTimeout(() => {
				dispatch(setErrorFetchingJobDetails(''));
			}, 4000);
			onClose();
			return;
		}
		dispatch(setSelectedJob(jobDetail));
	}, [jobDetail, isDetailsLoading, dispatch, errorLoadingDetails, onClose]);

	const onSave = () => {
		if (!listingID) {
			return;
		}

		saveJobDetails(listingID);
	};

	const saveJobDetails = (userID: string) => {
		// if (userID === 'create') {
		// 	AthleteService.getInstance()
		// 		.create(jobDetail)
		// 		.then(() => onClose())
		// 		.catch((err) => {
		// 			dispatch(setErrorSavingData(err));
		// 			setTimeout(() => {
		// 				dispatch(setErrorSavingData(''));
		// 			}, 4000);
		// 		});
		// } else {
		// 	AthleteService.getInstance()
		// 		.updateAthlete(userID, jobDetail)
		// 		.then(() => onClose())
		// 		.catch((err) => {
		// 			dispatch(setErrorSavingData(err));
		// 			setTimeout(() => {
		// 				dispatch(setErrorSavingData(''));
		// 			}, 4000);
		// 		});
		// }
	};

	if (isDetailsLoading) {
		return <LoadingDocsDialog onClose={onClose} />;
	}

	return (
		<Modal isCentered isOpen={true} onClose={onClose} size='5xl'>
			<ModalOverlay bg='blackAlpha.600' backdropFilter='blur(5px)' />

			<ModalContent>
				<ModalHeader />
				<ModalCloseButton />
				<ModalBody>{<JobDetails />}</ModalBody>
				<Footer onSave={onSave} onClose={onClose} />
			</ModalContent>
		</Modal>
	);
}

const Footer = ({ onSave, onClose }: { onSave: () => void; onClose: () => void }) => {
	return (
		<ModalFooter justifyContent='center' gap='10px'>
			<Button
				onClick={onSave}
				paddingX={'40px'}
				bgColor='blue.400'
				_hover={{
					bgColor: 'blue.500',
				}}
				color='white'
			>
				SAVE
			</Button>
			<Button
				onClick={onClose}
				paddingX={'40px'}
				bgColor='red.400'
				_hover={{
					bgColor: 'red.500',
				}}
				color='white'
			>
				CANCEL
			</Button>
		</ModalFooter>
	);
};
