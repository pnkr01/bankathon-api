import { Button, Td, Tr } from '@chakra-ui/react';
import React from 'react';
import { COLORS, ROUTES } from '../../../../config/const';
import { useNavigate } from 'react-router-dom';

type ListingCardProps = {
	sno: number;
	applicant_id: string;
	job_title: string;
	job_role: string;
	status: string;
};

export default function ApplicantCard(props: ListingCardProps) {
	const { sno, applicant_id, job_title, job_role, status } = props;
	const navigate = useNavigate();

	const openScreeningQuestions = () => {
		navigate(`${ROUTES.SCREENING}/${applicant_id}`);
	};

	return (
		<Tr
			_hover={{
				bgColor: COLORS.LIGHT_CYAN,
				cursor: 'pointer',
			}}
		>
			<Td isNumeric> {sno}</Td>
			<Td>{job_title}</Td>
			<Td>{job_role}</Td>
			<Td>{status}</Td>
			<Td>
				<Button
					onClick={openScreeningQuestions}
					width='full'
					bgColor='red.400'
					_hover={{
						bgColor: 'red.500',
					}}
					color='white'
				>
					Start
				</Button>
			</Td>
		</Tr>
	);
}
