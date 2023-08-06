import {
	VStack,
	Input,
	Textarea,
	InputGroup,
	InputRightElement,
	Select,
	Text,
	FormControl,
	FormLabel,
} from '@chakra-ui/react';

type TextInputProps = {
	label: string;
	placeholder?: string;
	value: string;
	onChange: (value: string) => void;
	isDisabled?: boolean;
	isRequired?: boolean;
	fullWidth?: boolean;
};

export function TextInput({
	label,
	placeholder,
	value,
	onChange,
	isDisabled = false,
	isRequired = false,
	fullWidth = false,
}: TextInputProps) {
	return (
		<FormControl isRequired={isRequired}>
			<VStack gap='1px' alignItems={'flex-start'}>
				<FormLabel color='gray.400' fontSize={'sm'}>
					{label}
				</FormLabel>
				<Input
					value={value}
					onChange={(e) => onChange(e.target.value)}
					borderColor='gray.400'
					placeholder={placeholder || label}
					focusBorderColor='gray.400'
					size='sm'
					rounded='md'
					disabled={isDisabled}
					width={fullWidth ? '100%' : '400px'}
				/>
			</VStack>
		</FormControl>
	);
}
export function TextAreaInput({
	label,
	placeholder,
	value,
	onChange,
	isDisabled = false,
	isRequired = false,
}: TextInputProps) {
	return (
		<FormControl isRequired={isRequired}>
			<VStack gap='1px' alignItems={'flex-start'}>
				<FormLabel color='gray.400' fontSize={'sm'}>
					{label}
				</FormLabel>
				<Textarea
					value={value}
					onChange={(e) => onChange(e.target.value)}
					borderColor='gray.400'
					placeholder={placeholder || label}
					focusBorderColor='gray.400'
					size='sm'
					rounded='md'
					width={'850px'}
					maxHeight={'250px'}
					disabled={isDisabled}
				/>
			</VStack>
		</FormControl>
	);
}

type NumberInputProps = TextInputProps & {
	icon?: React.ReactNode;
};
export function NumberInput({
	label,
	placeholder,
	value,
	onChange,
	icon,
	isDisabled = false,
	isRequired = false,
}: NumberInputProps) {
	return (
		<FormControl isRequired={isRequired}>
			<VStack gap='1px' alignItems={'flex-start'} fontSize={'sm'}>
				<FormLabel color='gray.400'>{label}</FormLabel>
				<InputGroup size='sm' width={'270px'}>
					<Input
						value={value}
						onChange={(e) => onChange(e.target.value)}
						borderColor='gray.400'
						placeholder={placeholder || label}
						focusBorderColor='gray.400'
						rounded='md'
						disabled={isDisabled}
					/>
					{icon && <InputRightElement marginRight='5px'>{icon}</InputRightElement>}
				</InputGroup>
			</VStack>
		</FormControl>
	);
}

export type DateInputProps = Omit<TextInputProps, 'placeholder'>;

export function DateInput({
	label,
	value,
	onChange,
	isDisabled = false,
	isRequired = false,
}: DateInputProps) {
	const [year, month, day] = (value || '--').split('-');

	const onDayChange = (value: string) => {
		if (Number(value) > 31) return;
		const newValue = `${year}-${month}-${value}`;
		onChange(newValue);
	};

	const onMonthChange = (value: string) => {
		if (Number(value) > 12) return;
		const newValue = `${year}-${value}-${day}`;
		onChange(newValue);
	};

	const onYearChange = (value: string) => {
		if (Number(value) > 2050) return;
		const newValue = `${value}-${month}-${day}`;
		onChange(newValue);
	};

	return (
		<FormControl isRequired={isRequired}>
			<VStack gap='1px' alignItems={'flex-start'}>
				<FormLabel color='gray.400' fontSize={'sm'}>
					{label}
				</FormLabel>
				<InputGroup gap='5px'>
					<Input
						value={day}
						onChange={(e) => onDayChange(e.target.value)}
						borderColor='gray.400'
						placeholder='DD'
						focusBorderColor='gray.400'
						size='sm'
						textAlign='center'
						rounded='md'
						width={'50px'}
						type='number'
						max={31}
						disabled={isDisabled}
					/>
					<Input
						value={month}
						onChange={(e) => onMonthChange(e.target.value)}
						borderColor='gray.400'
						placeholder='MM'
						focusBorderColor='gray.400'
						size='sm'
						textAlign='center'
						rounded='md'
						width={'50px'}
						type='number'
						max={12}
						disabled={isDisabled}
					/>
					<Input
						value={year}
						onChange={(e) => onYearChange(e.target.value)}
						borderColor='gray.400'
						placeholder='YYYY'
						focusBorderColor='gray.400'
						size='sm'
						textAlign='center'
						rounded='md'
						width={'80px'}
						type='number'
						max={2050}
						disabled={isDisabled}
					/>
				</InputGroup>
			</VStack>
		</FormControl>
	);
}

export type SelectInputProps = Omit<TextInputProps, 'placeholder'>;

export function SportInput({
	label,
	value,
	onChange,
	isDisabled = false,
	isRequired = false,
}: SelectInputProps) {
	return (
		<FormControl isRequired={isRequired}>
			<VStack gap='1px' alignItems={'flex-start'}>
				<FormLabel color='gray.400' fontSize={'sm'}>
					{label}
				</FormLabel>
				<Select
					placeholder='Select Sport'
					width={'270px'}
					value={value}
					onChange={(e) => onChange(e.target.value)}
					size='sm'
					rounded='md'
					borderColor='gray.400'
					focusBorderColor='gray.400'
					disabled={isDisabled}
				>
					<option value='Cricket'>Cricket</option>
					<option value='option2'>Option 2</option>
					<option value='option3'>Option 3</option>
					{/* TODO */}
				</Select>
			</VStack>
		</FormControl>
	);
}

export type GenderInputProps = Omit<TextInputProps, 'placeholder'>;

export function GenderInput({
	value,
	onChange,
	isDisabled = false,
	isRequired = false,
}: SelectInputProps) {
	return (
		<FormControl isRequired={isRequired}>
			<VStack gap='1px' alignItems={'flex-start'}>
				<FormLabel color='gray.400' fontSize={'sm'}>
					Gender
				</FormLabel>
				<Select
					placeholder='Gender'
					width={'270px'}
					value={value}
					onChange={(e) => onChange(e.target.value)}
					size='sm'
					rounded='md'
					borderColor='gray.400'
					focusBorderColor='gray.400'
					disabled={isDisabled}
				>
					<option value='M'>Male</option>
					<option value='F'>Female</option>
					<option value='other'>Other's</option>
					{/* TODO */}
				</Select>
			</VStack>
		</FormControl>
	);
}
