import jwt from 'jsonwebtoken';

const isJWTError = (e: unknown) => {
	return (
		e instanceof jwt.JsonWebTokenError ||
		e instanceof jwt.TokenExpiredError ||
		e instanceof jwt.NotBeforeError
	);
};

const isValid = (token: string, secret: string) => {
	return decode(token, secret) !== null;
};
const decode = (token: string, secret: string) => {
	try {
		const decoded = jwt.verify(token, secret);
		return decoded;
	} catch (e: unknown) {
		return null;
	}
};

export default { isJWTError, isValid, decode };
