import { NextFunction, Request, Response } from 'express';
import { USER_TYPES } from '../config/const';
import { Locals } from '../types';
import APIError, { API_ERRORS } from '../errors/api-errors';
import { UserService } from '../database/services';

const AuthenticateUser = async (req: Request, res: Response, next: NextFunction) => {
	const token = req.cookies.auth_token;

	try {
		const { user, role, auth_token } = await UserService.verifyToken(token);

		req.locals = {
			user_id: user._id,
			user: user,
			role: role,
		} as Locals;

		res.locals = {
			auth_token: auth_token,
		} as Locals;

		next();
	} catch (e: unknown) {
		return next(new APIError(API_ERRORS.USER_ERRORS.AUTHORIZATION_ERROR));
	}
};

const IsUser = async (req: Request, res: Response, next: NextFunction) => {
	const { role } = req.locals;
	if (role !== USER_TYPES.USER) {
		return next(new APIError(API_ERRORS.USER_ERRORS.AUTHORIZATION_ERROR));
	}
	next();
};

const IsAdmin = async (req: Request, res: Response, next: NextFunction) => {
	const { role } = req.locals;

	if (role !== USER_TYPES.HR) {
		return next(new APIError(API_ERRORS.USER_ERRORS.AUTHORIZATION_ERROR));
	}
	next();
};

export default { AuthenticateUser, IsUser, IsAdmin };
