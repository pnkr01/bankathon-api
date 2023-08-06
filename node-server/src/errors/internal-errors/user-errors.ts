import { ServerError } from '../../types';

const USER_ERRORS = {
	NOT_FOUND: {
		STATUS: 404,
		TITLE: 'NOT_FOUND',
		MESSAGE: 'The requested resource was not found.',
	},
	INACTIVE_ACCOUNT: {
		STATUS: 400,
		TITLE: 'INACTIVE_ACCOUNT',
		MESSAGE: 'The requested account is inactive.',
	},
	INVALID_OTP: {
		STATUS: 400,
		TITLE: 'INVALID_OTP',
		MESSAGE: 'This OTP is invalid.',
	},
	REFERRED_ALREADY: {
		STATUS: 400,
		TITLE: 'REFERRED_ALREADY',
		MESSAGE: 'You have already been referred by someone.',
	},
	KYC_ALREADY_DONE: {
		STATUS: 400,
		TITLE: 'KYC_ALREADY_DONE',
		MESSAGE: 'You have already completed your KYC.',
	},
	INVALID_PAN: {
		STATUS: 400,
		TITLE: 'INVALID_PAN',
		MESSAGE: 'The PAN you entered is invalid.',
	},
	INVALID_AADHAAR: {
		STATUS: 400,
		TITLE: 'INVALID_AADHAAR',
		MESSAGE: 'The Aadhaar you entered is invalid.',
	},
	AADHAAR_KYC_ALREADY_DONE: {
		STATUS: 400,
		TITLE: 'AADHAAR_KYC_ALREADY_DONE',
		MESSAGE: 'You have already completed your Aadhaar KYC.',
	},
} satisfies {
	[error: string]: ServerError;
};

export default USER_ERRORS;
