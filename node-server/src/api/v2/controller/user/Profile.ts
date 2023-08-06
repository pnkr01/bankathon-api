import { NextFunction, Request, Response } from 'express';
import { UserService } from '../../../../database/services';
import APIError, { API_ERRORS } from '../../../../errors/api-errors';
import { Respond } from '../../../../utils/ExpressUtils';
import { z } from 'zod';
import { idValidator } from '../../../../utils/Validator';
import { FileUtils } from '../../../../utils/files';
import DateUtils from '../../../../utils/DateUtils';
import InternalError, { INTERNAL_ERRORS } from '../../../../errors/internal-errors';
import { UPLOADS_PATH } from '../../../../config/const';

export default class ProfileController {
	private static instance: ProfileController;

	private constructor() {
		// singleton
	}

	static getInstance() {
		if (ProfileController.instance === undefined) {
			ProfileController.instance = new ProfileController();
		}
		return ProfileController.instance;
	}

	async GetProfile(req: Request, res: Response) {
		const { user } = req.locals;

		const userService = new UserService(user);
		return Respond({
			res,
			status: 200,
			data: {
				profile: await userService.getUserDetails(),
			},
		});
	}

	async GetUserProfile(req: Request, res: Response, next: NextFunction) {
		const [isIDValid, userID] = idValidator(req.params.userID);
		if (isIDValid === false) {
			return next(new APIError(API_ERRORS.COMMON_ERRORS.INVALID_FIELDS));
		}
		try {
			const userService = await UserService.getServiceByUserId(userID);
			const details = await userService.getUserDetails();

			return Respond({
				res,
				status: 200,
				data: {
					profile: details,
				},
			});
		} catch (err) {
			if (err instanceof InternalError) {
				if (err.title === INTERNAL_ERRORS.COMMON_ERRORS.NOT_FOUND.TITLE) {
					return next(new APIError(API_ERRORS.COMMON_ERRORS.NOT_FOUND));
				}
			}
			return next(new APIError(API_ERRORS.COMMON_ERRORS.INTERNAL_SERVER_ERROR, err));
		}
	}

	async updateProfile(req: Request, res: Response, next: NextFunction) {
		const [idValid, userID] = idValidator(req.params.userID);

		const validator = z.object({
			first_name: z.string().min(1).max(100).optional(),
			last_name: z.string().min(0).max(100).optional(),
			email: z.string().email().min(1).max(100).optional(),
			gender: z.string().min(1).max(100).optional(),
			dob: z
				.string()
				.regex(/^\d{4}-\d{2}-\d{2}$/)
				.refine((dob) => {
					return DateUtils.getMoment(dob, 'YYYY-MM-DD').isValid();
				})
				.transform((dob) => {
					return DateUtils.getMoment(dob, 'YYYY-MM-DD').toDate();
				})
				.optional(),
		});

		const validationResult = validator.safeParse(req.body);

		if (validationResult.success === false || idValid === false) {
			return next(new APIError(API_ERRORS.COMMON_ERRORS.INVALID_FIELDS));
		}

		const profileData = validationResult.data;

		try {
			const userService = await UserService.getServiceByUserId(userID);
			await userService.updateDetails(profileData);

			return Respond({
				res,
				status: 200,
				data: {
					message: 'User Profile updated successfully',
				},
			});
		} catch (err) {
			if (err instanceof InternalError) {
				if (err.title === INTERNAL_ERRORS.COMMON_ERRORS.NOT_FOUND.TITLE) {
					return next(new APIError(API_ERRORS.COMMON_ERRORS.NOT_FOUND));
				}
			}
			return next(new APIError(API_ERRORS.COMMON_ERRORS.INTERNAL_SERVER_ERROR, err));
		}
	}

	async GetUsers(req: Request, res: Response) {
		const users = await UserService.getUsers();
		return Respond({
			res,
			status: 200,
			data: {
				users: users.map((user) => ({
					...user,
					status: undefined,
				})),
			},
		});
	}

	async getStaticResources(req: Request, res: Response, next: NextFunction) {
		const { filename } = req.params;

		try {
			if (FileUtils.exists(__basedir + UPLOADS_PATH + filename)) {
				res.sendFile(__basedir + UPLOADS_PATH + filename);
			} else {
				throw new Error('File not found');
			}
		} catch (e) {
			return next(new APIError(API_ERRORS.COMMON_ERRORS.NOT_FOUND));
		}
	}
}
