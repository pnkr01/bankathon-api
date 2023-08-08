import { ServerError } from '../../types';

const COMMON_ERRORS = {
	INTERNAL_SERVER_ERROR: {
		STATUS: 500,
		TITLE: 'INTERNAL_SERVER_ERROR',
		MESSAGE: 'Something went wrong. Please try again later.',
	},
	NOT_FOUND: {
		STATUS: 404,
		TITLE: 'NOT_FOUND',
		MESSAGE: 'The requested resource was not found.',
	},
} satisfies {
	[error: string]: ServerError;
};

export default COMMON_ERRORS;
