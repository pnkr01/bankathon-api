import { InputGroup, InputLeftAddon, Input } from '@chakra-ui/react';
import { useMemo } from 'react';
import { COLORS, EMAIL_REGEX } from '../../../../config/const';
import { BORDER_NONE } from '../../../../config/ui';
import { z } from 'zod';
import { useDispatch, useSelector } from 'react-redux';
import StoreState from '../../../../types/store';
import { AuthStatus, setEmail } from '../../../../store/reducers/AuthReducer';
import { StoreNames } from '../../../../store';
import { EmailIcon } from '@chakra-ui/icons';

export default function EmailInput() {
	const { email, status } = useSelector((state: StoreState) => state[StoreNames.AUTH]);
	const dispatch = useDispatch();
	const setValue = (value: string) => {
		dispatch(setEmail(value));
	};

	const isEmailValid = useMemo(() => {
		if (email.length === 0) return true;
		const validator = z.string().regex(EMAIL_REGEX).safeParse(email);
		return validator.success;
	}, [email]);

	return (
		<InputGroup>
			<InputLeftAddon
				{...BORDER_NONE}
				bgColor={COLORS.BACKGROUND}
				children={<EmailIcon />}
				padding='15px'
				color={COLORS.SECONDARY}
			/>
			<Input
				{...BORDER_NONE}
				type='email'
				disabled={status === AuthStatus.OTP_SENT}
				isInvalid={!isEmailValid}
				errorBorderColor={COLORS.SECONDARY}
				value={email}
				onChange={(e) => setValue(e.target.value)}
				bgColor={COLORS.BACKGROUND}
				color={COLORS.SECONDARY}
				letterSpacing='wider'
				rounded='md'
				paddingLeft='0'
				placeholder='email'
				_placeholder={{ color: COLORS.SECONDARY, opacity: 0.8 }}
				_disabled={{
					opacity: 1,
				}}
			/>
		</InputGroup>
	);
}
