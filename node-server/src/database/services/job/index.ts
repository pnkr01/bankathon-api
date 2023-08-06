import { Types } from 'mongoose';
import InternalError, { INTERNAL_ERRORS } from '../../../errors/internal-errors';
import IJob from '../../../types/job';
import JobDB from '../../repository/job';

type CreateJobProps = {
	name: string;
	role: string;
	description: string;
	skills: string[];
};

type UpdateJobProps = Partial<CreateJobProps> & {
	enhanced_description?: string;
};

export default class JobService {
	private job: IJob;

	public constructor(job: IJob) {
		this.job = job;
	}

	static async getServiceById(id: Types.ObjectId) {
		const job = await JobDB.findById(id);
		if (job === null) {
			throw new InternalError(INTERNAL_ERRORS.COMMON_ERRORS.NOT_FOUND);
		}
		return new JobService(job);
	}

	static async createJob(props: CreateJobProps) {
		const newJob = await JobDB.create(props);
		return {
			id: newJob._id,
			name: newJob.name,
			role: newJob.role,
			description: newJob.description,
			skills: newJob.skills,
			enhanced_description: newJob.enhanced_description,
			status: newJob.status,
		};
	}

	async updateJob(props: UpdateJobProps) {
		if (props.name !== undefined) {
			this.job.name = props.name;
		}
		if (props.role !== undefined) {
			this.job.role = props.role;
		}
		if (props.description !== undefined) {
			this.job.description = props.description;
		}
		if (props.skills !== undefined) {
			this.job.skills = props.skills;
		}
		if (props.enhanced_description !== undefined) {
			this.job.enhanced_description = props.enhanced_description;
		}
		await this.job.save();
		return {
			id: this.job._id,
			name: this.job.name,
			role: this.job.role,
			description: this.job.description,
			skills: this.job.skills,
			enhanced_description: this.job.enhanced_description,
			status: this.job.status,
		};
	}

	getDetails() {
		return {
			id: this.job._id,
			name: this.job.name,
			role: this.job.role,
			description: this.job.description,
			skills: this.job.skills,
			enhanced_description: this.job.enhanced_description,
			status: this.job.status,
		};
	}

	static async getJobs() {
		const jobs = await JobDB.find({}).sort({ createdAt: -1 });
		return jobs.map((job) => ({
			id: job._id,
			name: job.name,
			role: job.role,
			description: job.description,
			skills: job.skills,
			enhanced_description: job.enhanced_description,
			status: job.status,
		}));
	}
}
