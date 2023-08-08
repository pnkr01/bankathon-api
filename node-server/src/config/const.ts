export const DATABASE_URL = process.env.DATABASE_URL as string;
export const PYTHON_SERVER_URL = process.env.PYTHON_SERVER_URL as string;

export const ALLOWED_ORIGINS =
	process.env.ALLOWED_ORIGINS !== undefined ? process.env.ALLOWED_ORIGINS.split(',') : [];

export const IS_PRODUCTION = process.env.MODE === 'production';
export const IS_UAT = process.env.MODE === 'uat';

export const PORT = process.env.PORT !== undefined ? process.env.PORT : undefined;

export const OTP_LENGTH = !isNaN(Number(process.env.OTP_LENGTH))
	? Number(process.env.OTP_LENGTH)
	: 0;

export const OTP_SECRET = process.env.OTP_SECRET !== undefined ? process.env.OTP_SECRET : '';
export const JWT_SECRET = process.env.JWT_SECRET !== undefined ? process.env.JWT_SECRET : '';
export const JWT_EXPIRE = process.env.JWT_EXPIRE !== undefined ? process.env.JWT_EXPIRE : '';
export const REFRESH_SECRET =
	process.env.REFRESH_SECRET !== undefined ? process.env.REFRESH_SECRET : '';
export const REFRESH_EXPIRE =
	process.env.REFRESH_EXPIRE !== undefined ? process.env.REFRESH_EXPIRE : '';

export const UPLOADS_PATH = '/static/uploads/';

export enum USER_TYPES {
	HR = 'HR',
	USER = 'USER',
}

export enum JOB_STATUS {
	CREATED = 'CREATED',
	ACTIVE = 'ACTIVE', // if job are active, then it will be shown in the job list
	INACTIVE = 'INACTIVE', // if job are inactive, then it will not be shown in the job list
	PROCESSING_JD = 'PROCESSING_JD',
	JD_PROCESSED = 'JD_PROCESSED',
	PROCESSING_CV = 'PROCESSING_CV',
	PROCESSED = 'PROCESSED',
}

export enum APPLICANT_STATUS {
	APPLIED = 'APPLIED',
	SCREENING = 'SCREENING',
	INTERVIEW = 'INTERVIEW',
	SELECTED = 'SELECTED',
}
