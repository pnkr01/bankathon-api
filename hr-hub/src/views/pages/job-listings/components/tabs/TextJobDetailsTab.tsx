import { Box, HStack, Text, VStack } from '@chakra-ui/react';
import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { StoreNames } from '../../../../../store';
import StoreState from '../../../../../types/store';
import {
    setJobDescription,
    setName,
    setRole,
    setSkillSet,
} from '../../../../../store/reducers/JobListingReducer';
import {
    Step,
    StepDescription,
    StepIcon,
    StepIndicator,
    StepNumber,
    StepSeparator,
    StepStatus,
    StepTitle,
    Stepper,
    useSteps,
} from '@chakra-ui/react'; // Import from Chakra UI

export default function JobDetailsTab() {
    const { jobDetail } = useSelector((state: StoreState) => state[StoreNames.JOB_LISTING]);
    const dispatch = useDispatch();

    const { job_description, name, role, skill_set } = jobDetail;

    const { activeStep } = useSteps({ index: 0, count: 3 }); // Initialize activeStep

    return (
        <Box maxHeight={'60vh'} overflow='scroll'>
            <Box>
                <Text fontSize='lg' fontWeight='medium' color='gray.500' pb='20px'>
                    Basic Details
                </Text>
            </Box>

            <VStack spacing='10px' alignItems='flex-start'>
                {/* Your existing input fields */}
            </VStack>

            <Stepper index={activeStep}>
                <Step>
                    <StepIndicator>
                        <StepStatus
                            complete={<StepIcon />}
                            incomplete={<StepNumber />}
                            active={<StepNumber />}
                        />
                    </StepIndicator>

                    <Box flexShrink='0'>
                        <StepTitle>Step 1</StepTitle>
                        <StepDescription>Step 1 Description</StepDescription>
                    </Box>

                    <StepSeparator />
                </Step>

                <Step>
                    <StepIndicator>
                        <StepStatus
                            complete={<StepIcon />}
                            incomplete={<StepNumber />}
                            active={<StepNumber />}
                        />
                    </StepIndicator>

                    <Box flexShrink='0'>
                        <StepTitle>Step 2</StepTitle>
                        <StepDescription>Step 2 Description</StepDescription>
                    </Box>

                    <StepSeparator />
                </Step>

                <Step>
                    <StepIndicator>
                        <StepStatus
                            complete={<StepIcon />}
                            incomplete={<StepNumber />}
                            active={<StepNumber />}
                        />
                    </StepIndicator>

                    <Box flexShrink='0'>
                        <StepTitle>Step 3</StepTitle>
                        <StepDescription>Step 3 Description</StepDescription>
                    </Box>
                </Step>
            </Stepper>
        </Box>
    );
}
