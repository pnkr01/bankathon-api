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
import { useNavigate, useParams } from 'react-router-dom';
import { ROUTES } from '../../../../config/const';
import ModalView from './ModalView';
import { LoadingDocsDialog } from '../../../components/dialog';
import { useCallback, useEffect } from 'react';
import { useJobDetails } from '../../../../hooks';
import {
	setErrorFetchingJobDetails,
	setErrorSavingData,
	setSelectedJob,
} from '../../../../store/reducers/JobListingReducer';
import { useDispatch, useSelector } from 'react-redux';
import { StoreNames, StoreState } from '../../../../store';
import ApplicantService from '../../../../services/applicant.service';

export default function JobDetailsModal() {
	const navigate = useNavigate();
	const dispatch = useDispatch();
	const { id: listingID } = useParams();

	const [jobDetails, isDetailsLoading, errorLoadingDetails] = useJobDetails(
		listingID && listingID !== 'create' ? listingID : null
	);
	const { isLoading, uploadedResume } = useSelector(
		(state: StoreState) => state[StoreNames.JOB_LISTING]
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
		dispatch(setSelectedJob(jobDetails));
	}, [jobDetails, isDetailsLoading, dispatch, errorLoadingDetails, onClose]);

	const onApplyClicked = () => {
		if (!listingID || !uploadedResume) {
			return;
		}
		ApplicantService.getInstance()
			.registerApplicant(listingID, uploadedResume)
			.catch((err) => {
				dispatch(setErrorSavingData(err));
				setTimeout(() => {
					dispatch(setErrorSavingData(''));
				}, 4000);
			})
			.finally(onClose);
	};

	if (isDetailsLoading || isLoading) {
		return <LoadingDocsDialog onClose={onClose} />;
	}

	return (
		<Modal isCentered isOpen={true} onClose={onClose} size='5xl'>
			<ModalOverlay bg='blackAlpha.600' backdropFilter='blur(5px)' />

			<ModalContent>
				<ModalHeader />
				<ModalCloseButton />
				<ModalBody height={'70vh'}>
					<ModalView />
				</ModalBody>
				<Footer canSave={uploadedResume !== null} onSave={onApplyClicked} onClose={onClose} />
			</ModalContent>
		</Modal>
	);
}

const Footer = ({
	canSave,
	onSave,
	onClose,
}: {
	canSave: boolean;
	onSave: () => void;
	onClose: () => void;
}) => {
	return (
		<ModalFooter justifyContent='center' gap='10px'>
			<Button
				onClick={onSave}
				paddingX={'40px'}
				bgColor='blue.400'
				_hover={{
					bgColor: 'blue.500',
				}}
				isDisabled={!canSave}
				color='white'
			>
				APPLY NOW
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
