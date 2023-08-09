import {
	Modal,
	ModalBody,
	ModalCloseButton,
	ModalContent,
	ModalHeader,
	ModalOverlay,
} from '@chakra-ui/react';
import { useNavigate, useParams } from 'react-router-dom';
import { ROUTES } from '../../../../config/const';
import { useCallback, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { setSelectedApplicant } from '../../../../store/reducers/ApplicantsReducer';
import { ApplicantDetails } from './tabs';

export default function ApplicantDetailsModal() {
	const navigate = useNavigate();
	const dispatch = useDispatch();
	const { id: applicantID } = useParams();

	const onClose = useCallback(() => {
		navigate(ROUTES.APPLICANTS);
	}, [navigate]);

	useEffect(() => {
		if (!applicantID) {
			onClose();
			return;
		}
		dispatch(setSelectedApplicant(applicantID));
	}, [dispatch, applicantID, onClose]);

	return (
		<Modal isCentered isOpen={true} onClose={onClose} size='5xl'>
			<ModalOverlay bg='blackAlpha.600' backdropFilter='blur(5px)' />

			<ModalContent>
				<ModalHeader />
				<ModalCloseButton />
				<ModalBody height={'70vh'}>
					<ApplicantDetails />
				</ModalBody>
			</ModalContent>
		</Modal>
	);
}
