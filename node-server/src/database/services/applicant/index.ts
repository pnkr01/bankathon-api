import { Types } from 'mongoose';
import { APPLICANT_STATUS } from '../../../config/const';
import ApplicantDB from '../../repository/applicant';
import DateUtils from '../../../utils/DateUtils';
import InternalError, { INTERNAL_ERRORS } from '../../../errors/internal-errors';

type RegisterApplicantProps = {
	user: Types.ObjectId;
	user_details: Types.ObjectId;
	job: Types.ObjectId;
	resume: string;
};

export default class ApplicantService {
	static async register(props: RegisterApplicantProps) {
		const { user, user_details, job, resume } = props;

		const exists = await ApplicantDB.exists({
			user,
			user_details,
			job,
		});
		if (exists) {
			throw new InternalError(INTERNAL_ERRORS.COMMON_ERRORS.ALREADY_EXISTS);
		}

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
			applicationDoc: application,
		};
	}

	static async getApplicants(user?: Types.ObjectId) {
		const applicants = await ApplicantDB.find({
			...(user !== undefined && { user: user }),
		}).populate('user user_details job');

		return applicants.map((applicant) => ({
			id: applicant._id,
			name: applicant.user_details.first_name + ' ' + applicant.user_details.last_name,
			email: applicant.user.email,
			phone: applicant.user_details.phone,
			gender: applicant.user_details.gender,
			dob: DateUtils.format(applicant.user_details.dob, 'DD/MM/YYYY'),
			resume: applicant.resume,
			status: applicant.status,
			job: {
				id: applicant.job._id,
				name: applicant.job.name,
				role: applicant.job.role,
				status: applicant.job.status,
				job_description: applicant.job.description,
				skills: applicant.job.skills,
			},
			score: applicant.status >= APPLICANT_STATUS.SCREENING_COMPLETED ? applicant.score : undefined,
		}));
	}

	static async getApplicantQuestions(id: Types.ObjectId) {
		const applicant = await ApplicantDB.findOne(id).populate('user user_details job');
		if (!applicant) {
			throw new InternalError(INTERNAL_ERRORS.COMMON_ERRORS.NOT_FOUND);
		}

		return applicant.questions.map((question) => question.question);
	}

	static async setApplicantAnswers(id: Types.ObjectId, answers: string[]) {
		const applicant = await ApplicantDB.findOne(id).populate('user user_details job');
		if (!applicant) {
			throw new InternalError(INTERNAL_ERRORS.COMMON_ERRORS.NOT_FOUND);
		}

		for (let i = 0; i < applicant.questions.length; i++) {
			applicant.questions[i].answer = answers[i];
		}

		await applicant.save();
		const questions = applicant.questions.map((question) => question.question);
		return [questions, answers];
	}

	static async saveResults(id: Types.ObjectId, scores: number[]) {
		const applicant = await ApplicantDB.findOne(id).populate('user user_details job');
		if (!applicant) {
			throw new InternalError(INTERNAL_ERRORS.COMMON_ERRORS.NOT_FOUND);
		}

		for (let i = 0; i < applicant.questions.length; i++) {
			applicant.questions[i].score = scores[i];
		}

		const totalScore = scores.reduce((a, b) => a + b, 0);
		applicant.score = totalScore;
		applicant.status = APPLICANT_STATUS.SCREENING_COMPLETED;

		await applicant.save();
	}
}
