import { AddIcon, LinkIcon } from '@chakra-ui/icons';
import {
	VStack,
	Input,
	FormControl,
	FormLabel,
	Textarea,
	Box,
	Button,
	Text,
} from '@chakra-ui/react';
import { useRef } from 'react';

type TextInputProps = {
	label: string;
	placeholder?: string;
	value: string;
	fullWidth?: boolean;
};

export function DisplayInfo({ label, placeholder, value }: TextInputProps) {
	return (
		<FormControl>
			<VStack gap='1px' alignItems={'flex-start'}>
				<FormLabel color='gray.400' fontSize={'sm'}>
					{label}
				</FormLabel>
				<Box
					onChange={() => {}}
					borderColor='gray.400'
					borderWidth='1px'
					padding={'5px'}
					placeholder={placeholder || label}
					rounded='md'
					width={'full'}
				>
					{value}
				</Box>
			</VStack>
		</FormControl>
	);
}

export function TextAreaInput({ label, placeholder, value }: TextInputProps) {
	return (
		<FormControl height='full'>
			<VStack gap='1px' alignItems={'flex-start'} height='full'>
				<FormLabel color='gray.400' fontSize={'sm'}>
					{label}
				</FormLabel>
				<Textarea
					value={value}
					onChange={() => {}}
					borderColor='gray.400'
					placeholder={placeholder || label}
					focusBorderColor='gray.400'
					size='sm'
					rounded='md'
					width={'full'}
					height={'full'}
					resize={'none'}
					isDisabled
				/>
			</VStack>
		</FormControl>
	);
}

type FileInputProps = {
	text: string;
	onFileChange: (file?: File) => void;
	accept?: string;
};

export function FileInput({ onFileChange, text, accept = 'image/*' }: FileInputProps) {
	const inputRef = useRef<HTMLInputElement>(null);
	return (
		<>
			<Button
				onClick={() => inputRef.current?.click()}
				colorScheme='blue'
				variant='outline'
				paddingY={'5px'}
				paddingX={'15px'}
				leftIcon={<LinkIcon />}
			>
				<Text>{text}</Text>
			</Button>
			<Input
				ref={inputRef}
				type='file'
				opacity={0}
				position={'absolute'}
				height='1px'
				width='1px'
				onChange={(e) => onFileChange(e.target.files?.[0])}
				accept={accept}
			/>
		</>
	);
}
