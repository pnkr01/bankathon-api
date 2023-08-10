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

	const openProfile = () => {
		navigate(`${ROUTES.JOB_LISTINGS}/${id}`);
	};

	const handleCloseListing = (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
		event.stopPropagation();
		const instance = JobService.getInstance();
		const promise = status === 'ACTIVE' ? instance.deactivateJob(id) : instance.activateJob(id);
		promise
			.then((data) => {
				dispatch(
					updateJob({
						id,
						job: {
							id: id,
							name: data.name,
							job_description: data.description,
							enhanced_description: data.enhanced_description,
							role: data.role,
							skill_set: data.skills.join(','),
							status: data.status,
						},
					})
				);
			})
			.catch((err) => {
				//ignore
			});
	};

	return (
		<Tr
			_hover={{
				bgColor: COLORS.LIGHT_CYAN,
				cursor: 'pointer',
			}}
			onClick={openProfile}
		>
			<Td isNumeric> {sno}</Td>
			<Td>{name}</Td>
			<Td>{role}</Td>
			<Td>{status}</Td>
			<Td>
				<Button
					onClick={handleCloseListing}
					width='full'
					bgColor='blue.400'
					_hover={{
						bgColor: 'blue.500',
					}}
					color='white'
				>
					{status === 'INACTIVE' ? 'Send Email Invites' : 'Close Listing'}
				</Button>
			</Td>
		</Tr>
	);
}
