import InternalError from './InternalError';
import COMMON_ERRORS from './common-errors';
import USER_ERRORS from './user-errors';

export default InternalError;

const INTERNAL_ERRORS = {
	COMMON_ERRORS: COMMON_ERRORS,
	USER_ERRORS: USER_ERRORS,
};

export { INTERNAL_ERRORS, COMMON_ERRORS, USER_ERRORS };
