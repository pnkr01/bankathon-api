import { Modal, ModalOverlay, ModalContent, Center } from '@chakra-ui/react';
import Lottie from 'lottie-react';
import React from 'react';
import { LOADING_DOCS } from '../../../assets/Lottie';

type Props = {
	onClose?: () => void;
};

export default function LoadingDocsDialog({ onClose = () => {} }: Props) {
	return (
		<Modal isCentered isOpen={true} onClose={onClose} size='md'>
			<ModalOverlay bg='blackAlpha.600' backdropFilter='blur(5px)' />
			<ModalContent>
				<Center height='200px'>
					<Lottie
						animationData={LOADING_DOCS}
						loop={true}
						style={{
							width: '200px',
						}}
					/>
				</Center>
			</ModalContent>
		</Modal>
	);
}
