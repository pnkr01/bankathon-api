import { z } from 'zod';
import { OTP_LENGTH, OTP_SECRET } from '../config/const';
import crypto from 'crypto';

const GenerateOTP = () => {
	const length = OTP_LENGTH;
	const min = Math.pow(10, length - 1);
	const max = Math.pow(10, length) - 1;
	const otp = Math.floor(Math.random() * (max - min + 1)) + min;
	return otp;
};

const HashOTP = (phone: string, otp: number) => {
	const ttl = 5 * 60 * 1000; // Valid for 5 minutes
	const expires = Date.now() + ttl;
	const data = `${phone}.${otp}.${expires}`; // combine the data to be hashed
	const hash = crypto.createHmac('sha256', OTP_SECRET).update(data).digest('hex'); //hash phone and otp with secret
	const fullHash = `${hash}.${expires}`;
	return fullHash; // return the hash and expiry time
};

function VerifyOTP(phone: string, hash: string, otp: string) {
	// Separate Hash value and expires from the hash returned from the user
	const [hashValue, expires] = hash.split('.');

	const isValid = z.string();

	if (!isValid.safeParse(hashValue).success || !isValid.safeParse(expires).success) {
		return false;
	}
	// Check if expiry time has passed
	if (Date.now() > parseInt(expires)) {
		return false;
	}
	// Calculate new hash with the same key and the same algorithm
	const data = `${phone}.${otp}.${expires}`;
	const newHash = crypto.createHmac('sha256', OTP_SECRET).update(data).digest('hex');
	// Match the hashes
	return newHash === hashValue;
}

export default {
	GenerateOTP,
	HashOTP,
	VerifyOTP,
};
