import { APIError } from '../../types';

const USER_ERRORS = {
	AUTHORIZATION_ERROR: {
		STATUS: 401,
		TITLE: 'AUTHORIZATION_ERROR',
		MESSAGE: 'The user is not authorized to perform this action.',
	},
	INACTIVE_ACCOUNT_ERROR: {
		STATUS: 400,
		TITLE: 'INACTIVE_ACCOUNT_ERROR',
		MESSAGE: 'The user account is inactive. Please contact the administrator.',
	},
	INVALID_EMAIL_ERROR: {
		STATUS: 400,
		TITLE: 'INVALID_EMAIL_ERROR',
		MESSAGE: 'The email is invalid. Please try again later.',
	},
	INVALID_OTP_ERROR: {
		STATUS: 400,
		TITLE: 'INVALID_OTP_ERROR',
		MESSAGE: 'The OTP is invalid. Please try again later.',
	},
	INVALID_EMAIL_AND_ROLE_ERROR: {
		STATUS: 400,
		TITLE: 'INVALID_EMAIL_AND_ROLE_ERROR',
		MESSAGE: 'Please provide a valid email along with user role to authenticate.',
	},
	USER_ALREADY_EXISTS: {
		STATUS: 400,
		TITLE: 'USER_ALREADY_EXISTS',
		MESSAGE: 'The user already exists. Please try again later.',
	},
	USER_NOT_FOUND_ERROR: {
		STATUS: 404,
		TITLE: 'USER_NOT_FOUND_ERROR',
		MESSAGE: 'The user was not found. Please try again later.',
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
	AADHAAR_OTP_VERIFICATION_FAILED: {
		STATUS: 400,
		TITLE: 'AADHAAR_OTP_VERIFICATION_FAILED',
		MESSAGE: 'The Aadhaar OTP verification failed. Please try again later.',
	},
	AADHAAR_ALREADY_TAKEN: {
		STATUS: 400,
		TITLE: 'AADHAAR_ALREADY_TAKEN',
		MESSAGE: 'The Aadhaar is already taken. Please try with another Aadhaar.',
	},
} satisfies {
	[error: string]: APIError;
};

export default USER_ERRORS;
