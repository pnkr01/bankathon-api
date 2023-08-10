import { NextFunction, Request, Response } from 'express';
import { idValidator } from '../../../../utils/Validator';
import { FileUploadOptions } from '../../../../utils/files';
import FileUpload, { ONLY_PDF_ALLOWED, ResolvedFile } from '../../../../utils/files/FileUpload';
import APIError, { API_ERRORS } from '../../../../errors/api-errors';
import { UserService } from '../../../../database/services';
import ApplicantService from '../../../../database/services/applicant';
import { Respond } from '../../../../utils/ExpressUtils';
import InternalError, { INTERNAL_ERRORS } from '../../../../errors/internal-errors';
import ChatGPTProvider from '../../../../provider/chat-gpt';
import JobService from '../../../../database/services/job';
import { JOB_STATUS } from '../../../../config/const';

export default class ApplicantController {
	private static instance: ApplicantController;

	private constructor() {
		// singleton
	}

	static getInstance() {
		if (ApplicantController.instance === undefined) {
			ApplicantController.instance = new ApplicantController();
		}

		return ApplicantController.instance;
	}

	async registerApplication(req: Request, res: Response, next: NextFunction) {
		const fileUploadOptions: FileUploadOptions = {
			field_name: 'file',
			options: {
				fileFilter: ONLY_PDF_ALLOWED,
			},
		};

		let uploadedFile: ResolvedFile | null = null;

		try {
			uploadedFile = await FileUpload.SingleFileUpload(req, res, fileUploadOptions);
		} catch (err: unknown) {
			return next(new APIError(API_ERRORS.COMMON_ERRORS.FILE_UPLOAD_ERROR, err));
		}
		if (uploadedFile === null) {
			return next(new APIError(API_ERRORS.COMMON_ERRORS.FILE_UPLOAD_ERROR));
		}

		const [isJobValid, jobID] = idValidator(req.body.job);

		if (!isJobValid) {
			return next(new APIError(API_ERRORS.COMMON_ERRORS.INVALID_FIELDS));
		}

		try {
			const userService = await UserService.getServiceByUserId(req.locals.user_id);
			const user_details = await userService.getKYCDocument();
			const jobService = await JobService.getServiceById(jobID);
			if (!user_details) {
				return next(new APIError(API_ERRORS.COMMON_ERRORS.INTERNAL_SERVER_ERROR));
			} else if (jobService.getDetails().status !== JOB_STATUS.ACTIVE) {
				return next(new APIError(API_ERRORS.COMMON_ERRORS.NOT_FOUND));
			}

			const { applicationDoc } = await ApplicantService.register({
				user: req.locals.user_id,
				user_details: user_details._id,
				job: jobID,
				resume: uploadedFile.filename,
			});

			try {
				const score = await ChatGPTProvider.analyzeCV({
					job_description: jobService.getDetails().description,
					resume_file: uploadedFile.path,
					skills: jobService.getDetails().skills,
				});
				if (score > 10) {
					applicationDoc.score = score / 10;
				} else {
					applicationDoc.score = score;
				}

				await applicationDoc.save();
			} catch (e) {
				console.log(e);

				await applicationDoc.remove();
				throw new InternalError(INTERNAL_ERRORS.COMMON_ERRORS.INTERNAL_SERVER_ERROR);
			}

			return Respond({
				res,
				status: 201,
				data: {},
			});
		} catch (e) {
			if (e instanceof InternalError) {
				if (e.isSameInstanceof(INTERNAL_ERRORS.COMMON_ERRORS.NOT_FOUND)) {
					return next(new APIError(API_ERRORS.COMMON_ERRORS.NOT_FOUND));
				} else if (e.isSameInstanceof(INTERNAL_ERRORS.COMMON_ERRORS.ALREADY_EXISTS)) {
					return next(new APIError(API_ERRORS.COMMON_ERRORS.ALREADY_EXISTS));
				}
			}
			return next(new APIError(API_ERRORS.COMMON_ERRORS.INTERNAL_SERVER_ERROR, e));
		}
	}

	async getApplicants(req: Request, res: Response) {
		const applicants = await ApplicantService.getApplicants();

		return Respond({
			res,
			status: 200,
			data: {
				applicants,
			},
		});
	}
}
