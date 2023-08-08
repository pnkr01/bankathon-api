import {
	Button,
	Modal,
	ModalBody,
	ModalCloseButton,
	ModalContent,
	ModalFooter,
	ModalHeader,
	ModalOverlay,
	useSteps,
} from '@chakra-ui/react';
import { useNavigate, useParams } from 'react-router-dom';
import { ROUTES } from '../../../../config/const';
import ModalView from './ModalView';
import { LoadingDocsDialog } from '../../../components/dialog';
import { useCallback, useEffect, useState } from 'react';
import { useJobDetails } from '../../../../hooks';
import {
	setErrorFetchingJobDetails,
	setErrorSavingData,
	setLoading,
	setSelectedJob,
} from '../../../../store/reducers/JobListingReducer';
import { useDispatch, useSelector } from 'react-redux';
import { StoreNames, StoreState } from '../../../../store';
import JobService from '../../../../services/job.service';

export default function JobDetailsModal() {
	const navigate = useNavigate();
	const dispatch = useDispatch();
	const { id: listingID } = useParams();
	const { activeStep, setActiveStep } = useSteps({ index: 0, count: 2 });

	const [jobDetails, isDetailsLoading, errorLoadingDetails] = useJobDetails(
		listingID && listingID !== 'create' ? listingID : null
	);
	const {
		jobDetail: { name, job_description, role, skill_set },
		isLoading,
	} = useSelector((state: StoreState) => state[StoreNames.JOB_LISTING]);

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

	const onSave = () => {
		if (!listingID) {
			return;
		}

		if (activeStep === 0) {
			if (listingID === 'create') {
				dispatch(setLoading(true));
				JobService.getInstance()
					.createJob({
						name,
						role,
						description: job_description,
						skills: skill_set.split(','),
					})
					.then((result) => {
						dispatch(
							setSelectedJob({
								id: result.id,
								name: result.name,
								role: result.role,
								job_description: result.description,
								enhanced_description: result.enhanced_description,
								jd_processed: result.status === 'JD_PROCESSED',
								skill_set: result.skills,
								status: result.status,
							})
						);
						setActiveStep(1);
					})
					.catch((err) => dispatch(setErrorSavingData(err)))
					.finally(() => dispatch(setLoading(false)));
			} else {
				dispatch(setLoading(true));
				JobService.getInstance()
					.update(listingID, {
						name,
						role,
						description: job_description,
						skills: skill_set.split(','),
					})
					.then((result) => {
						dispatch(
							setSelectedJob({
								id: result.id,
								name: result.name,
								role: result.role,
								job_description: result.description,
								enhanced_description: result.enhanced_description,
								jd_processed: result.status === 'JD_PROCESSED',
								skill_set: result.skills,
								status: result.status,
							})
						);
						setActiveStep(1);
					})
					.catch((err) => dispatch(setErrorSavingData(err)))
					.finally(() => dispatch(setLoading(false)));
			}
		}
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
					<ModalView activeStep={activeStep} setActiveStep={setActiveStep} />
				</ModalBody>
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
				SUBMIT
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
