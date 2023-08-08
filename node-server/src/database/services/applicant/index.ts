import { Types } from 'mongoose';
import InternalError, { INTERNAL_ERRORS } from '../../../errors/internal-errors';
import IJob from '../../../types/job';
import JobDB from '../../repository/job';
import { APPLICANT_STATUS, JOB_STATUS } from '../../../config/const';
import ApplicantDB from '../../repository/applicant';
import DateUtils from '../../../utils/DateUtils';

type CreateJobProps = {
	user: Types.ObjectId;
	user_details: Types.ObjectId;
	job: Types.ObjectId;
	resume: string;
};

type UpdateJobProps = Partial<CreateJobProps> & {
	enhanced_description?: string;
	status?: JOB_STATUS;
};

export default class ApplicantService {
	private job: IJob;

	public constructor(job: IJob) {
		this.job = job;
	}

	static async getServiceById(id: Types.ObjectId) {
		const job = await JobDB.findById(id);
		if (job === null) {
			throw new InternalError(INTERNAL_ERRORS.COMMON_ERRORS.NOT_FOUND);
		}
		return new ApplicantService(job);
	}

	static async register(props: CreateJobProps) {
		const { user, user_details, job, resume } = props;

		const application = await ApplicantDB.create({
			user,
			user_details,
			job,
			resume,
			status: APPLICANT_STATUS.APPLIED,
		});

		return {
			id: application._id,
			user: application.user,
			user_details: application.user_details,
			job: application.job,
			resume: application.resume,
			status: application.status,
		};
	}
	static async getApplicants() {
		const applicants = await ApplicantDB.find().select('user user_details job');
		return applicants.map((applicant) => ({
			id: applicant._id,
			name: applicant.user_details.first_name + ' ' + applicant.user_details.last_name,
			email: applicant.user.email,
			phone: applicant.user_details.phone,
			gender: applicant.user_details.gender,
			dob: DateUtils.format(applicant.user_details.dob, 'DD/MM/YYYY'),
			resume: applicant.resume,
			job: {
				id: applicant.job._id,
				name: applicant.job.name,
				role: applicant.job.role,
				status: applicant.job.status,
				job_description: applicant.job.description,
				skills: applicant.job.skills,
			},
		}));
	}
}
