import { CorsOptions } from 'cors';
import { Request } from 'express';
import { ALLOWED_ORIGINS, IS_PRODUCTION } from './const';

export default function (
	req: Request,
	callback: (err: Error | null, options?: CorsOptions) => void
) {
	let corsOptions;

	if (!IS_PRODUCTION) {
		corsOptions = { origin: true, credentials: true };
		return callback(null, corsOptions);
	}

	const origin = req.header('Origin') ?? '';
	const isDomainAllowed = ALLOWED_ORIGINS.indexOf(origin) !== -1;

	if (isDomainAllowed) {
		corsOptions = { origin: true, credentials: true };
	} else {
		corsOptions = { origin: false };
	}

	callback(null, corsOptions);
}
