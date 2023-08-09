import {
	VStack,
	Input,
	Textarea,
	InputGroup,
	InputRightElement,
	Select,
	FormControl,
	FormLabel,
} from '@chakra-ui/react';

type TextInputProps = {
	label: string;
	placeholder?: string;
	value: string;
	fullWidth?: boolean;
};

export function TextInput({ label, placeholder, value }: TextInputProps) {
	return (
		<FormControl>
			<VStack gap='1px' alignItems={'flex-start'}>
				<FormLabel color='gray.400' fontSize={'sm'}>
					{label}
				</FormLabel>
				<Input
					value={value}
					onChange={() => {}}
					borderColor='gray.400'
					placeholder={placeholder || label}
					focusBorderColor='gray.400'
					size='sm'
					isDisabled
					rounded='md'
					width={'full'}
				/>
			</VStack>
		</FormControl>
	);
}
