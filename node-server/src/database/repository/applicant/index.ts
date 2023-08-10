import mongoose, { Schema } from 'mongoose';
import IApplicant from '../../../types/applicant';
import { APPLICANT_STATUS } from '../../../config/const';

const questionSchema = new Schema({
	question: String,
	reference: String,
	type: String,
	tag: [String],
	answer: String,
	score: Number,
});

const applicantSchema = new mongoose.Schema<IApplicant>({
	user: {
		type: mongoose.Schema.Types.ObjectId,
		ref: 'User',
		required: true,
	},
	user_details: {
		type: mongoose.Schema.Types.ObjectId,
		ref: 'KYCDetail',
		required: true,
	},
	job: {
		type: mongoose.Schema.Types.ObjectId,
		ref: 'Job',
		required: true,
	},
	resume: {
		type: String,
	},
	status: {
		type: String,
		enum: APPLICANT_STATUS,
		default: APPLICANT_STATUS.APPLIED,
	},
	score: {
		type: Number,
		default: 0,
	},
	questions: [questionSchema],
});

const ApplicantDB = mongoose.model<IApplicant>('Applicant', applicantSchema);

export default ApplicantDB;
