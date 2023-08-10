import { NextFunction, Request, Response } from 'express';
import { APPLICANT_STATUS, JOB_STATUS, USER_TYPES } from '../../../../config/const';
import { Respond } from '../../../../utils/ExpressUtils';
import APIError, { API_ERRORS } from '../../../../errors/api-errors';
import { z } from 'zod';
import JobService from '../../../../database/services/job';
import { idValidator } from '../../../../utils/Validator';
import ChatGPTProvider from '../../../../provider/chat-gpt';
import InternalError, { INTERNAL_ERRORS } from '../../../../errors/internal-errors';
import ApplicantService from '../../../../database/services/applicant';

export default class JobController {
	private static instance: JobController;

	private constructor() {
		// singleton
	}

	static getInstance() {
		if (JobController.instance === undefined) {
			JobController.instance = new JobController();
		}

		return JobController.instance;
	}

	async getJobs(req: Request, res: Response) {
		const { role } = req.locals;
		const jobs = await JobService.getJobs();

		if (role === USER_TYPES.HR) {
			return Respond({
				res,
				status: 200,
				data: { jobs },
			});
		} else {
			return Respond({
				res,
				status: 200,
				data: {
					jobs: jobs
						.filter((job) => job.status === JOB_STATUS.ACTIVE)
						.map((job) => ({
							id: job.id,
							name: job.name,
							role: job.role,
							description: job.description,
							status: job.status,
							skills: job.skills,
						})),
				},
			});
		}
	}

	async getJob(req: Request, res: Response, next: NextFunction) {
		const { role } = req.locals;
		const { id } = req.params;
		const [isIDValid, jobID] = idValidator(id);

		if (!isIDValid) {
			return next(new APIError(API_ERRORS.COMMON_ERRORS.INVALID_FIELDS));
		}
		try {
			const job = await JobService.getServiceById(jobID);
			const details = job.getDetails();
			if (role === USER_TYPES.HR) {
				return Respond({
					res,
					status: 200,
					data: {
						job: details,
					},
				});
			} else {
				if (details.status !== JOB_STATUS.ACTIVE) {
					return next(new APIError(API_ERRORS.COMMON_ERRORS.NOT_FOUND));
				}

				return Respond({
					res,
					status: 200,
					data: {
						job: {
							id: details.id,
							name: details.name,
							role: details.role,
							description: details.description,
							skills: details.skills,
						},
					},
				});
			}
		} catch (err) {
			return next(new APIError(API_ERRORS.COMMON_ERRORS.NOT_FOUND));
		}
	}

	async createJob(req: Request, res: Response, next: NextFunction) {
		const bodyValidator = z.object({
			name: z.string().min(1).max(100),
			role: z.string().min(1).max(100),
			description: z.string().min(1),
			skills: z.array(z.string().min(1)),
		});

		const validationResult = bodyValidator.safeParse(req.body);

		if (validationResult.success === false) {
			return next(new APIError(API_ERRORS.COMMON_ERRORS.INVALID_FIELDS));
		}

		try {
			const job = await JobService.createJob(validationResult.data);
			const enhanced_description = await ChatGPTProvider.enhanceJobDescription(
				job.id,
				job.description
			);

			job.jobObj.enhanced_description = enhanced_description.enhanced_description;
			await job.jobObj.save();
			return Respond({
				res,
				status: 201,
				data: {
					job: {
						...job,
						jobObj: undefined,
					},
				},
			});
		} catch (err) {
			return next(new APIError(API_ERRORS.COMMON_ERRORS.INTERNAL_SERVER_ERROR));
		}
	}

	async updateJob(req: Request, res: Response, next: NextFunction) {
		const { id } = req.params;
		const [isIDValid, jobID] = idValidator(id);

		const bodyValidator = z.object({
			name: z.string().optional(),
			role: z.string().optional(),
			description: z.string().optional(),
			skills: z
				.array(z.string().min(1))
				.transform((arr) => arr.map((item) => item.trim()))
				.optional(),
		});

		const validationResult = bodyValidator.safeParse(req.body);

		if (validationResult.success === false || !isIDValid) {
			return next(new APIError(API_ERRORS.COMMON_ERRORS.INVALID_FIELDS));
		}
		try {
			const job = await JobService.getServiceById(jobID);
			let details = await job.updateJob({
				...validationResult.data,
				status: JOB_STATUS.CREATED,
			});
			const enhanced_description = await ChatGPTProvider.enhanceJobDescription(
				details.id,
				details.description
			);
			details = await job.updateJob({
				enhanced_description: enhanced_description.enhanced_description,
				status: JOB_STATUS.JD_PROCESSED,
			});
			return Respond({
				res,
				status: 200,
				data: {
					job: details,
				},
			});
		} catch (err) {
			if (err instanceof InternalError) {
				if (err.isSameInstanceof(INTERNAL_ERRORS.COMMON_ERRORS.NOT_FOUND)) {
					return next(new APIError(API_ERRORS.COMMON_ERRORS.NOT_FOUND));
				}
			}
			return next(new APIError(API_ERRORS.COMMON_ERRORS.INTERNAL_SERVER_ERROR, err));
		}
	}

	async acceptEnhancedDescription(req: Request, res: Response, next: NextFunction) {
		const { id } = req.params;
		const [isIDValid, jobID] = idValidator(id);

		if (!isIDValid) {
			return next(new APIError(API_ERRORS.COMMON_ERRORS.INVALID_FIELDS));
		}
		try {
			const job = await JobService.getServiceById(jobID);
			const details = await job.updateJob({
				description: job.getDetails().enhanced_description,
				status: JOB_STATUS.PROCESSED,
			});
			return Respond({
				res,
				status: 200,
				data: {
					job: details,
				},
			});
		} catch (err) {
			if (err instanceof InternalError) {
				if (err.isSameInstanceof(INTERNAL_ERRORS.COMMON_ERRORS.NOT_FOUND)) {
					return next(new APIError(API_ERRORS.COMMON_ERRORS.NOT_FOUND));
				}
			}
			return next(new APIError(API_ERRORS.COMMON_ERRORS.INTERNAL_SERVER_ERROR, err));
		}
	}

	async activate(req: Request, res: Response, next: NextFunction) {
		const { id } = req.params;
		const [isIDValid, jobID] = idValidator(id);

		if (!isIDValid) {
			return next(new APIError(API_ERRORS.COMMON_ERRORS.INVALID_FIELDS));
		}
		try {
			const job = await JobService.getServiceById(jobID);
			const details = await job.updateJob({
				status: JOB_STATUS.ACTIVE,
			});
			return Respond({
				res,
				status: 200,
				data: {
					job: details,
				},
			});
		} catch (err) {
			if (err instanceof InternalError) {
				if (err.isSameInstanceof(INTERNAL_ERRORS.COMMON_ERRORS.NOT_FOUND)) {
					return next(new APIError(API_ERRORS.COMMON_ERRORS.NOT_FOUND));
				}
			}
			return next(new APIError(API_ERRORS.COMMON_ERRORS.INTERNAL_SERVER_ERROR, err));
		}
	}

	async deactivate(req: Request, res: Response, next: NextFunction) {
		const { id } = req.params;
		const [isIDValid, jobID] = idValidator(id);

		if (!isIDValid) {
			return next(new APIError(API_ERRORS.COMMON_ERRORS.INVALID_FIELDS));
		}
		try {
			const job = await JobService.getServiceById(jobID);
			const details = await job.updateJob({
				status: JOB_STATUS.INACTIVE,
			});
			return Respond({
				res,
				status: 200,
				data: {
					job: details,
				},
			});
		} catch (err) {
			if (err instanceof InternalError) {
				if (err.isSameInstanceof(INTERNAL_ERRORS.COMMON_ERRORS.NOT_FOUND)) {
					return next(new APIError(API_ERRORS.COMMON_ERRORS.NOT_FOUND));
				}
			}
			return next(new APIError(API_ERRORS.COMMON_ERRORS.INTERNAL_SERVER_ERROR, err));
		}
	}

	async screenings(req: Request, res: Response) {
		const applications = await ApplicantService.getApplicants(req.locals.user_id);
		console.log(applications);

		return Respond({
			res,
			status: 200,
			data: {
				screenings: applications
					.filter((application) => {
						return (
							application.job.status === JOB_STATUS.ACTIVE ||
							application.status === APPLICANT_STATUS.SCREENING ||
							application.status === APPLICANT_STATUS.APPLIED
						);
					})
					.map((application) => ({
						applicant_id: application.id,
						job_title: application.job.name,
						job_role: application.job.role,
						status: application.status,
					})),
			},
		});
	}
}
