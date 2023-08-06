import { Box, HStack, Text, VStack } from '@chakra-ui/react';
import React from 'react';
import { TextAreaInput, TextInput } from './InputFields';
import { useDispatch, useSelector } from 'react-redux';
import { StoreNames } from '../../../../../store';
import StoreState from '../../../../../types/store';
import {
	setJobDescription,
	setName,
	setRole,
	setSkillSet,
} from '../../../../../store/reducers/JobListingReducer';

export default function JobDetailsTab() {
	const { jobDetail } = useSelector((state: StoreState) => state[StoreNames.JOB_LISTING]);
	const dispatch = useDispatch();

	const { job_description, name, role, skill_set } = jobDetail;

	return (
		<Box maxHeight={'60vh'} overflow='scroll'>
			<Box>
				<Text fontSize='lg' fontWeight='medium' color='gray.500' pb='20px'>
					Basic Details
				</Text>
			</Box>

			<VStack spacing='10px' alignItems='flex-start'>
				<TextInput
					label='Job Title'
					value={name}
					isRequired
					onChange={(text) => dispatch(setName(text))}
				/>
				<HStack spacing='50px'>
					<TextInput
						label='Role'
						value={role}
						isRequired
						onChange={(text) => dispatch(setRole(text))}
					/>
					<TextInput
						label='Skill Set'
						value={skill_set}
						isRequired
						onChange={(text) => dispatch(setSkillSet(text))}
					/>
				</HStack>

				<Box>
					<TextAreaInput
						label='Job Description'
						value={job_description}
						onChange={(text) => dispatch(setJobDescription(text))}
					/>
				</Box>
			</VStack>
		</Box>
	);
}
