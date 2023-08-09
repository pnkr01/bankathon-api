import { Box, Flex, HStack, Text, VStack } from '@chakra-ui/react';
import { useDispatch, useSelector } from 'react-redux';
import { StoreNames, StoreState } from '../../../../store';
import { TextAreaInput, DisplayInfo, FileInput } from './tabs/InputFields';
import { setResumeFile } from '../../../../store/reducers/JobListingReducer';
import { useEffect } from 'react';

export default function ModalView() {
	const {
		uploadedResume,
		jobDetail: { name, job_description, role, skill_set },
	} = useSelector((state: StoreState) => state[StoreNames.JOB_LISTING]);
	const dispatch = useDispatch();

	useEffect(() => {
		dispatch(setResumeFile(undefined));
	}, [dispatch]);

	return (
		<Box height={'70vh'} overflow='scroll'>
			<VStack spacing='10px' alignItems='flex-start' height='full'>
				<DisplayInfo label='Job Title' value={name} />
				<HStack spacing='50px' width='full'>
					<DisplayInfo label='Role' value={role} />
					<DisplayInfo label='Skill Set' value={skill_set} />
				</HStack>
				<Box width='full' height='full'>
					<TextAreaInput label='Job Description' value={job_description} />
				</Box>
				<Flex width={'full'} justifyContent='center'>
					{uploadedResume ? (
						<Text>Resume File Uploaded</Text>
					) : (
						<FileInput
							accept='application/pdf'
							text='Upload Resume'
							onFileChange={(file) => dispatch(setResumeFile(file))}
						/>
					)}
				</Flex>
			</VStack>
		</Box>
	);
}
