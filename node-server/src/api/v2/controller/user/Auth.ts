import { NextFunction, Request, Response } from 'express';
import { IS_PRODUCTION, USER_TYPES } from '../../../../config/const';
import { Email } from '../../../../utils/messenger';
import { Respond } from '../../../../utils/ExpressUtils';
import APIError, { API_ERRORS } from '../../../../errors/api-errors';
import InternalError, { INTERNAL_ERRORS } from '../../../../errors/internal-errors';
import { z } from 'zod';
import { UserService } from '../../../../database/services';

export default class AuthController {
	private static instance: AuthController;

	private constructor() {
		// singleton
	}

	static getInstance() {
		if (AuthController.instance === undefined) {
			AuthController.instance = new AuthController();
		}

		return AuthController.instance;
	}

	async Login(req: Request, res: Response, next: NextFunction) {
		const { email, role } = req.body;

		const validator = z.object({
			email: z.string().email(),
			role: z.nativeEnum(USER_TYPES),
		});
		const validationResult = validator.safeParse(req.body);

		if (validationResult.success === false) {
			return next(new APIError(API_ERRORS.USER_ERRORS.INVALID_EMAIL_AND_ROLE_ERROR));
		}

		try {
			const [otp, hash] = await UserService.getLoginOTP(email, role);

			Email.SendLoginOTP(email, otp.toString());
			res.cookie('login_hash', hash, {
				sameSite: IS_PRODUCTION ? 'strict' : 'none',
				expires: new Date(Date.now() + 5 * 60 * 1000),
				httpOnly: true,
				secure: true,
			});

			return Respond({
				res,
				status: 200,
				data: {
					otp: !IS_PRODUCTION ? otp : undefined,
				},
			});
		} catch (err) {
			console.log(err);

			if (err instanceof InternalError) {
				if (err.isSameInstanceof(INTERNAL_ERRORS.COMMON_ERRORS.NOT_FOUND)) {
					return next(new APIError(API_ERRORS.USER_ERRORS.INVALID_EMAIL_AND_ROLE_ERROR));
				} else if (err.isSameInstanceof(INTERNAL_ERRORS.USER_ERRORS.INACTIVE_ACCOUNT)) {
					return next(new APIError(API_ERRORS.USER_ERRORS.INACTIVE_ACCOUNT_ERROR));
				}
			}

			return next(new APIError(API_ERRORS.COMMON_ERRORS.INTERNAL_SERVER_ERROR, err));
		}
	}

	async VerifyLogin(req: Request, res: Response, next: NextFunction) {
		const validator = z.object({
			otp: z
				.string()
				.length(6)
				.regex(/^[0-9]+$/),
			hash: z.string(),
		});

		const validationResult = validator.safeParse({
			otp: req.body.otp,
			hash: req.cookies.login_hash,
		});

		if (validationResult.success === false) {
			return next(new APIError(API_ERRORS.USER_ERRORS.INVALID_OTP_ERROR));
		}
		const { otp, hash } = validationResult.data;

		try {
			const { token, refresh_token, user } = await UserService.verifyLoginOTP(hash, otp);
			res.locals.auth_token = token;
			res.locals.refresh_token = refresh_token;
			res.clearCookie('login_hash');
			return Respond({
				res,
				status: 200,
				data: {
					user,
				},
			});
		} catch (err) {
			if (err instanceof InternalError) {
				if (err.isSameInstanceof(INTERNAL_ERRORS.COMMON_ERRORS.NOT_FOUND)) {
					return next(new APIError(API_ERRORS.USER_ERRORS.INVALID_EMAIL_AND_ROLE_ERROR));
				} else if (err.isSameInstanceof(INTERNAL_ERRORS.USER_ERRORS.INVALID_OTP)) {
					return next(new APIError(API_ERRORS.USER_ERRORS.INVALID_OTP_ERROR));
				}
			}
			return next(new APIError(API_ERRORS.COMMON_ERRORS.INTERNAL_SERVER_ERROR, err));
		}
	}

	async RefreshLogin(req: Request, res: Response, next: NextFunction) {
		const refresh_token = req.cookies.refresh_token;

		try {
			const token = await UserService.refreshToken(refresh_token);

			res.locals.auth_token = token;
			return Respond({
				res,
				status: 200,
				data: {},
			});
		} catch (err) {
			return next(new APIError(API_ERRORS.USER_ERRORS.USER_NOT_FOUND_ERROR));
		}
	}

	async Logout(req: Request, res: Response) {
		const refreshToken = req.cookies.refresh_token;

		UserService.logout(refreshToken);

		res.clearCookie('auth_token', {
			sameSite: IS_PRODUCTION ? 'strict' : 'none',
			secure: true,
		});
		res.clearCookie('refresh_token', {
			sameSite: IS_PRODUCTION ? 'strict' : 'none',
			secure: true,
		});

		return Respond({
			res,
			status: 200,
			data: {
				message: 'Logged Out.',
			},
		});
	}
}
