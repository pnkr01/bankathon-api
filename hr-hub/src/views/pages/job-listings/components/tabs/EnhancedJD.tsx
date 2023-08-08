import {
	Box,
	Button,
	ButtonGroup,
	Center,
	HStack,
	Popover,
	PopoverArrow,
	PopoverBody,
	PopoverCloseButton,
	PopoverContent,
	PopoverFooter,
	PopoverHeader,
	PopoverTrigger,
	Text,
	VStack,
	useDisclosure,
} from '@chakra-ui/react';
import React from 'react';
import { TextAreaInput, TextInput } from './InputFields';
import { useDispatch, useSelector } from 'react-redux';
import { StoreNames } from '../../../../../store';
import StoreState from '../../../../../types/store';
import {
	setEnhancedJD,
	setErrorSavingData,
	setJobDescription,
	setLoading,
	setName,
	setRole,
	setSelectedJob,
	setSkillSet,
} from '../../../../../store/reducers/JobListingReducer';
import JobService from '../../../../../services/job.service';

export default function EnhancedJD() {
	const { jobDetail } = useSelector((state: StoreState) => state[StoreNames.JOB_LISTING]);
	const dispatch = useDispatch();

	const { isOpen, onClose, onOpen } = useDisclosure();

	const { id, job_description, enhanced_description: enhanced_jd } = jobDetail;

	function acceptEnhancedJD() {
		dispatch(setLoading(true));

		JobService.getInstance()
			.acceptEnhancedJD(id)
			.then((result) => {
				dispatch(
					setSelectedJob({
						id: result.id,
						name: result.name,
						role: result.role,
						job_description: result.description,
						enhanced_description: result.enhanced_description,
						jd_processed: result.status === 'JD_PROCESSED',
						skill_set: result.skills,
						status: result.status,
					})
				);
			})
			.catch((err) => dispatch(setErrorSavingData(err)))
			.finally(() => dispatch(setLoading(false)));
	}

	return (
		<Box height={'70vh'} overflow='scroll'>
			<HStack spacing='10px' alignItems='flex-start' height='80%'>
				<TextAreaInput
					label='Original Job Description'
					value={job_description}
					isDisabled
					onChange={(text) => {}}
				/>
				<TextAreaInput
					label='Enhanced Job Description'
					value={enhanced_jd}
					isDisabled
					onChange={(text) => {}}
				/>
			</HStack>
			<Center hidden={job_description === enhanced_jd}>
				<Popover
					returnFocusOnClose={false}
					isOpen={isOpen}
					onClose={onClose}
					placement='right'
					closeOnBlur={false}
				>
					<PopoverTrigger>
						<Button
							marginTop={'20px'}
							colorScheme='blue'
							variant='outline'
							width='300px'
							onClick={onOpen}
						>
							Accept Suggested Changes
						</Button>
					</PopoverTrigger>
					<PopoverContent>
						<PopoverArrow />
						<PopoverCloseButton />
						<PopoverHeader>Confirmation!</PopoverHeader>
						<PopoverBody>Are you sure you want to accept the suggest job description?</PopoverBody>
						<PopoverFooter
							border='0'
							display='flex'
							alignItems='center'
							justifyContent='space-between'
							pb={4}
						>
							<ButtonGroup size='sm'>
								<Button colorScheme='green' onClick={acceptEnhancedJD}>
									Accept
								</Button>
								<Button colorScheme='red' onClick={onClose}>
									Cancel
								</Button>
							</ButtonGroup>
						</PopoverFooter>
					</PopoverContent>
				</Popover>
			</Center>
		</Box>
	);
}
