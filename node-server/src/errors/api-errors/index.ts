import APIError from './APIError';
import USER_ERRORS from './auth-errors';
import COMMON_ERRORS from './common-errors';
import RAZORPAY_ERRORS from './razorpay-errors';
import TRANSACTION_ERRORS from './transaction-errors';

export default APIError;

const API_ERRORS = {
	USER_ERRORS: USER_ERRORS,
	COMMON_ERRORS: COMMON_ERRORS,
	RAZORPAY_ERRORS: RAZORPAY_ERRORS,
	TRANSACTION_ERRORS: TRANSACTION_ERRORS,
};

export { API_ERRORS, USER_ERRORS, COMMON_ERRORS };
