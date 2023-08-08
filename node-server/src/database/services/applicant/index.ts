import { Types } from 'mongoose';
import { APPLICANT_STATUS } from '../../../config/const';
import ApplicantDB from '../../repository/applicant';
import DateUtils from '../../../utils/DateUtils';

type RegisterApplicantProps = {
	user: Types.ObjectId;
	user_details: Types.ObjectId;
	job: Types.ObjectId;
	resume: string;
};

export default class ApplicantService {
	static async register(props: RegisterApplicantProps) {
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
