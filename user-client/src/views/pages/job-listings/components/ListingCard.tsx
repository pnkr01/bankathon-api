import { Button, Td, Tr } from '@chakra-ui/react';
import React from 'react';
import { COLORS, ROUTES } from '../../../../config/const';
import { useNavigate } from 'react-router-dom';
import JobService from '../../../../services/job.service';
import { useDispatch } from 'react-redux';
import { updateJob } from '../../../../store/reducers/JobListingReducer';

type ListingCardProps = {
	id: string;
	sno: number;
	name: string;
	role: string;
	status: string;
};

export default function ListingCard(props: ListingCardProps) {
	const { id, sno, name, role, status } = props;
	const navigate = useNavigate();
	const dispatch = useDispatch();

	const applyNow = () => {
		navigate(`${ROUTES.JOB_LISTINGS}/${id}`);
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
			<Td>{role}</Td>
			<Td>
				<Button
					onClick={applyNow}
					width='full'
					bgColor='blue.400'
					_hover={{
						bgColor: 'blue.500',
					}}
					isDisabled={status !== 'ACTIVE'}
					color='white'
				>
					Apply Now
				</Button>
			</Td>
		</Tr>
	);
}
