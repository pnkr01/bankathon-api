import mongoose from 'mongoose';
import IJob from '../../../types/job';
import { JOB_STATUS } from '../../../config/const';

const jobSchema = new mongoose.Schema<IJob>(
	{
		name: { type: String, required: true },
		role: { type: String, required: true },
		description: { type: String, required: true },
		skills: { type: [String], required: true },
		enhanced_description: { type: String },
		status: {
			type: String,
			enum: JOB_STATUS,
			default: JOB_STATUS.CREATED,
		},
	},
	{ timestamps: true }
);

const JobDB = mongoose.model<IJob>('Job', jobSchema);

export default JobDB;
