import { Box, Button, Center, HStack, Text, VStack } from '@chakra-ui/react';
import React from 'react';
import { TextInput } from './InputFields';
import { useSelector } from 'react-redux';
import { StoreNames } from '../../../../../store';
import StoreState from '../../../../../types/store';
import { SERVER_URL } from '../../../../../config/const';

export default function ApplicantDetailsTab() {
	const { applicantDetail } = useSelector((state: StoreState) => state[StoreNames.APPLICANTS]);

	const {
		name,
		email,
		phone,
		dob,
		gender,
		resume,
		job: { name: job_title, role: job_role },
	} = applicantDetail;

	const openResume = () => {
		window.open(`${SERVER_URL}static/uploads/${resume}`, '_blank');
	};

	return (
		<Box height={'70vh'} overflow='scroll'>
			<VStack spacing='10px' alignItems='flex-start'>
				<TextInput label='Applicant Name' value={name} />
				<HStack spacing='50px' width='full'>
					<TextInput label='Email' value={email} />
					<TextInput label='Phone Number' value={phone} />
				</HStack>
				<HStack spacing='50px' width='full'>
					<TextInput label='DOB' value={dob} />
					<TextInput label='Gender' value={gender} />
				</HStack>
				<HStack spacing='50px' width='full'>
					<TextInput label='Job Title' value={job_title} />
					<TextInput label='Job Role' value={job_role} />
				</HStack>

				<HStack spacing='50px' width='full' justifyContent={'center'}>
					<Button
						onClick={openResume}
						width='25%'
						bgColor='red.400'
						_hover={{
							bgColor: 'red.500',
						}}
						color='white'
					>
						Open Resume
					</Button>
					<Button
						onClick={openResume}
						width='40%'
						bgColor='blue.400'
						_hover={{
							bgColor: 'blue.500',
						}}
						color='white'
					>
						Download Screening Questions
					</Button>
				</HStack>
			</VStack>
		</Box>
	);
}
