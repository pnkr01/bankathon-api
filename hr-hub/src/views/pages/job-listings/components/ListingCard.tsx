import { Td, Tr } from '@chakra-ui/react';
import React from 'react';
import { COLORS, ROUTES } from '../../../../config/const';
import { useNavigate } from 'react-router-dom';

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

	const openProfile = () => {
		navigate(`${ROUTES.JOB_LISTINGS}/${id}`);
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
		</Tr>
	);
}
