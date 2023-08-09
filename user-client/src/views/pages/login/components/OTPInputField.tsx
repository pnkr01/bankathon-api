import { HStack, PinInput, PinInputField } from '@chakra-ui/react';
import { COLORS } from '../../../../config/const';
import { BORDER_NONE } from '../../../../config/ui';
import { useDispatch, useSelector } from 'react-redux';
import StoreState from '../../../../types/store';
import { setOTP } from '../../../../store/reducers/AuthReducer';
import { StoreNames } from '../../../../store';

const INPUT_FIELD_STYLE = {
	...BORDER_NONE,
	_placeholder: { color: COLORS.SECONDARY, opacity: 0.8 },
	bgColor: COLORS.BACKGROUND,
	color: COLORS.SECONDARY,
};
export default function OTPInput() {
	const { otp } = useSelector((state: StoreState) => state[StoreNames.AUTH]);

	const dispatch = useDispatch();
	const setValue = (value: string, index: number) => {
		dispatch(setOTP({ value, index }));
	};

	return (
		<HStack width='full' justifyContent='space-between' marginTop='2'>
			<PinInput manageFocus={true} type='number' otp focusBorderColor={COLORS.BACKGROUND_DARK}>
				<PinInputField
					{...INPUT_FIELD_STYLE}
					value={otp[0]}
					onChange={(e) => setValue(e.target.value, 0)}
				/>
				<PinInputField
					{...INPUT_FIELD_STYLE}
					value={otp[1]}
					onChange={(e) => setValue(e.target.value, 1)}
				/>
				<PinInputField
					{...INPUT_FIELD_STYLE}
					value={otp[2]}
					onChange={(e) => setValue(e.target.value, 2)}
				/>
				<PinInputField
					{...INPUT_FIELD_STYLE}
					value={otp[3]}
					onChange={(e) => setValue(e.target.value, 3)}
				/>
				<PinInputField
					{...INPUT_FIELD_STYLE}
					value={otp[4]}
					onChange={(e) => setValue(e.target.value, 4)}
				/>
				<PinInputField
					{...INPUT_FIELD_STYLE}
					value={otp[5]}
					onChange={(e) => setValue(e.target.value, 5)}
				/>
			</PinInput>
		</HStack>
	);
}
