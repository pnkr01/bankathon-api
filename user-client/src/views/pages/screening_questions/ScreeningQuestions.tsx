import React, { useEffect } from 'react';
import Lottie from 'lottie-react';
import {
	Box,
	Button,
	Center,
	HStack,
	ListItem,
	Stack,
	Step,
	StepIcon,
	StepIndicator,
	StepSeparator,
	StepStatus,
	Stepper,
	Text,
	UnorderedList,
	VStack,
	useSteps,
} from '@chakra-ui/react';
import { COLORS, ROUTES } from '../../../config/const';
import Webcam from 'react-webcam';
import { steps } from 'framer-motion';
import { useNavigate, useParams } from 'react-router-dom';
import { useQuestions } from '../../../hooks';
import { LoadingDocsDialog } from '../../components/dialog';
import { RECORDING } from '../../../assets/Lottie';

export default function ScreeningQuestions() {
	const { id: screeningID } = useParams<{ id: string }>();
	const navigate = useNavigate();
	const webcamRef = React.useRef<any>(null);
	const mediaRecorderRef = React.useRef<any>(null);
	const [capturing, setCapturing] = React.useState(false);
	const [recordedChunks, setRecordedChunks] = React.useState([]);
	const [isRecording, setRecording] = React.useState<boolean>(false);
	const [questions, isLoading, error] = useQuestions(screeningID);

	const { activeStep, setActiveStep } = useSteps({
		index: 0,
		count: 10,
	});

	const handleDataAvailable = React.useCallback(
		({ data }: { data: any }) => {
			if (data.size > 0) {
				setRecordedChunks((prev) => prev.concat(data));
			}
		},
		[setRecordedChunks]
	);

	const handleStopCaptureClick = React.useCallback(() => {
		mediaRecorderRef.current.stop();
		setCapturing(false);
	}, [mediaRecorderRef, setCapturing]);

	const handleDownload = React.useCallback(() => {
		if (recordedChunks.length) {
			const blob = new Blob(recordedChunks, {
				type: 'video/webm',
			});
			const url = URL.createObjectURL(blob);
			const a = document.createElement('a');
			document.body.appendChild(a);
			a.style.display = 'none';
			a.href = url;
			a.download = 'react-webcam-stream-capture.webm';
			a.click();
			window.URL.revokeObjectURL(url);
			setRecordedChunks([]);
		}
	}, [recordedChunks]);

	const handleStartCaptureClick = React.useCallback(() => {
		setCapturing(true);
		mediaRecorderRef.current = new MediaRecorder(webcamRef.current?.stream, {
			mimeType: 'video/webm',
		});
		mediaRecorderRef.current.addEventListener('dataavailable', handleDataAvailable);
		mediaRecorderRef.current.start();
	}, [webcamRef, setCapturing, mediaRecorderRef, handleDataAvailable]);

	if (isLoading) {
		return <LoadingDocsDialog />;
	}

	return (
		<Box
			width={'100vw'}
			height='100vh'
			position='absolute'
			left={0}
			top={0}
			zIndex={99}
			background={COLORS.PRIMARY_BACKGROUND}
		>
			<Text fontSize='3xl' fontWeight='bold' textAlign='center'>
				Screening Questions
			</Text>

			<HStack paddingX={'2rem'} alignItems='flex-start'>
				<VStack
					width={'30%'}
					borderWidth='1px'
					borderRadius={'0.5rem'}
					padding='0.5rem'
					borderColor={COLORS.GRAY}
					spacing='1rem'
					overflowY={'scroll'}
				>
					{capturing ? (
						<Webcam audio={false} ref={webcamRef} />
					) : (
						<Button
							onClick={handleStartCaptureClick}
							width='full'
							bgColor='red.400'
							_hover={{
								bgColor: 'red.500',
							}}
							color='white'
						>
							Start Screening Test
						</Button>
					)}

					<Text fontSize='xl' fontWeight='medium' textAlign='center'>
						Terms & Conditions
					</Text>
					<UnorderedList>
						<ListItem>
							Clear Audio: Use an external microphone or a quiet environment to ensure clear and
							crisp audio without background noise.
						</ListItem>
						<ListItem>
							Stable Footage: Use a tripod or stable surface to prevent shaky footage. Smooth camera
							movements enhance visual appeal.
						</ListItem>
						<ListItem>
							Good Lighting: Record in well-lit areas with natural light or soft artificial lighting
							to ensure clear visibility of your face and surroundings.
						</ListItem>
					</UnorderedList>

					{capturing && (
						<>
							<Button
								onClick={() => setRecording((prev) => !prev)}
								width='full'
								bgColor='green.400'
								_hover={{
									bgColor: 'green.500',
								}}
								color='white'
							>
								{isRecording ? 'Stop Recording' : 'Start Recording'}
							</Button>
							<Button
								onClick={() => setActiveStep((prev) => Math.min(prev + 1, 9))}
								width='full'
								bgColor='yellow.400'
								_hover={{
									bgColor: 'yellow.500',
								}}
								color='white'
							>
								Skip Question
							</Button>
							<Button
								onClick={() => navigate(ROUTES.HOME)}
								width='full'
								bgColor='blue.400'
								_hover={{
									bgColor: 'blue.500',
								}}
								color='white'
							>
								End Test
							</Button>
						</>
					)}
				</VStack>
				<VStack
					width={'70%'}
					borderWidth='1px'
					borderRadius={'0.5rem'}
					padding='0.5rem'
					borderColor={COLORS.GRAY}
					spacing='1rem'
					hidden={!capturing}
				>
					<Stack width='90%'>
						<Stepper index={activeStep}>
							{Array.from({ length: 10 }, (_, index) => (
								<Step key={index}>
									<StepIndicator>
										<StepStatus complete={<StepIcon />} />
									</StepIndicator>
									<StepSeparator />
								</Step>
							))}
						</Stepper>
						<Text>Question {activeStep + 1} of 10:</Text>
					</Stack>

					<Box>
						<Text>{questions[activeStep]}</Text>
					</Box>

					{isRecording && (
						<Box marginTop='100px'>
							<Center height='200px'>
								<Lottie
									animationData={RECORDING}
									loop={true}
									style={{
										width: '200px',
									}}
								/>
							</Center>
						</Box>
					)}
				</VStack>
			</HStack>
		</Box>
	);
}
