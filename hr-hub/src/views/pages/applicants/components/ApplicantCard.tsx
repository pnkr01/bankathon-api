import { Button, Td, Tr } from '@chakra-ui/react';
import React from 'react';
import { COLORS, ROUTES } from '../../../../config/const';
import { useNavigate } from 'react-router-dom';
import JobService from '../../../../services/job.service';
import { useDispatch } from 'react-redux';
import { updateJob } from '../../../../store/reducers/JobListingReducer';
import { Applicant } from '../../../../store/types/ApplicantState';

type ListingCardProps = Applicant & {
	sno: number;
};

export default function ApplicantCard(props: ListingCardProps) {
	const { id, sno, name, job } = props;
	const navigate = useNavigate();

	const openProfile = () => {
		navigate(`${ROUTES.APPLICANTS}/${id}`);
	};

	return (
		<Tr
			_hover={{
				bgColor: COLORS.LIGHT_CYAN,
				cursor: 'pointer',
			}}
		>
			<Td isNumeric> {sno}</Td>
			<Td>{name}</Td>
			<Td>{job.name}</Td>
			<Td>
				<Button
					onClick={openProfile}
					width='full'
					bgColor='red.400'
					_hover={{
						bgColor: 'red.500',
					}}
					color='white'
				>
					Profile
				</Button>
			</Td>
		</Tr>
	);
}
