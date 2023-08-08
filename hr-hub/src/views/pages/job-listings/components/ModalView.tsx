import {
	Box,
	Step,
	StepIcon,
	StepIndicator,
	StepNumber,
	StepSeparator,
	StepStatus,
	StepTitle,
	Stepper,
} from '@chakra-ui/react';
import { JobDetailsTab } from './tabs';
import EnhancedJD from './tabs/EnhancedJD';

const steps = ['Basic Details', 'Enhance Job Description'];

type Props = {
	activeStep: number;
	setActiveStep: (step: number) => void;
};

export default function ModalView({ activeStep, setActiveStep }: Props) {
	return (
		<Box>
			<Stepper index={activeStep}>
				{steps.map((title, index) => (
					<Step key={index}>
						<StepIndicator>
							<StepStatus
								complete={<StepIcon />}
								incomplete={<StepNumber />}
								active={<StepNumber />}
							/>
						</StepIndicator>

						<Box flexShrink='0'>
							<StepTitle>{title}</StepTitle>
						</Box>

						<StepSeparator />
					</Step>
				))}
			</Stepper>
			<Box marginTop={'20px'} />
			{activeStep === 0 && <JobDetailsTab />}
			{activeStep === 1 && <EnhancedJD />}
		</Box>
	);
}
