import axios from 'axios';
import APIInstance from '../config/APIInstance';

type CreateJobProps = {
	name: string;
	role: string;
	description: string;
	skills: string[];
};

export default class JobService {
	private static instance: JobService;

	private constructor() {
		// singleton
	}

	static getInstance(): JobService {
		if (!JobService.instance) {
			JobService.instance = new JobService();
		}
		return JobService.instance;
	}

	async getJobListings() {
		try {
			const { data } = await APIInstance.get('/job');
			if (data.success) {
				return Promise.resolve(
					data.jobs as {
						id: any;
						name: string;
						role: string;
						description: string;
						skills: string[];
						enhanced_description: string;
						status: string;
					}[]
				);
			} else {
				throw new Error('Error fetching jobs');
			}
		} catch (e) {
			let error = 'Error fetching jobs';
			if (axios.isAxiosError(e)) {
				if (e.code === 'ERR_NETWORK') {
					error = 'No internet connection';
				}
			}
			return Promise.reject(error);
		}
	}

	async getJob(id: string) {
		try {
			const { data } = await APIInstance.get(`/job/${id}`);

			if (data.success) {
				return Promise.resolve(
					data.job as {
						id: any;
						name: string;
						role: string;
						description: string;
						skills: string[];
						enhanced_description: string;
						status: string;
					}
				);
			} else {
				throw new Error('Error fetching user details.');
			}
		} catch (e) {
			let error = 'Error fetching user details.';
			if (axios.isAxiosError(e)) {
				if (e.code === 'ERR_NETWORK') {
					error = 'No internet connection';
				}
			}
			return Promise.reject(error);
		}
	}

	async createJob({ name, role, description, skills }: CreateJobProps) {
		try {
			const { data } = await APIInstance.post(`/job`, {
				name,
				role,
				description,
				skills,
			});
			if (data.success) {
				return Promise.resolve({
					id: data.job.id,
					name: data.job.name,
					role: data.job.role,
					description: data.job.description,
					skills: data.job.skills,
					enhanced_description: data.job.enhanced_description,
					status: data.job.status,
				});
			} else {
				throw new Error('Error creating job listing.');
			}
		} catch (e) {
			let error = 'Error creating job listing.';
			if (axios.isAxiosError(e)) {
				if (e.code === 'ERR_NETWORK') {
					error = 'No internet connection';
				}
				if (e.response) {
					const { title } = e.response.data;
					if (title === 'INVALID_FIELDS') {
						error = 'Please provide all the necessary information.';
					}
				}
			}
			return Promise.reject(error);
		}
	}

	async update(id: string, { name, role, description, skills }: Partial<CreateJobProps>) {
		try {
			const { data } = await APIInstance.patch(`/job/${id}`, {
				name,
				role,
				description,
				skills,
			});
			if (data.success) {
				return Promise.resolve({
					id: data.job.id,
					name: data.job.name,
					role: data.job.role,
					description: data.job.description,
					skills: data.job.skills,
					enhanced_description: data.job.enhanced_description,
					status: data.job.status,
				});
			} else {
				throw new Error('Error updating job listing.');
			}
		} catch (e) {
			let error = 'Error updating job listing.';
			if (axios.isAxiosError(e)) {
				if (e.code === 'ERR_NETWORK') {
					error = 'No internet connection';
				}
				if (e.response) {
					const { title } = e.response.data;
					if (title === 'INVALID_FIELDS') {
						error = 'Please provide all the necessary information.';
					}
				}
			}
			return Promise.reject(error);
		}
	}

	async acceptEnhancedJD(id: string) {
		try {
			const { data } = await APIInstance.post(`/job/${id}/accept-enhanced-job-description`);
			if (data.success) {
				return Promise.resolve({
					id: data.job.id,
					name: data.job.name,
					role: data.job.role,
					description: data.job.description,
					skills: data.job.skills,
					enhanced_description: data.job.enhanced_description,
					status: data.job.status,
				});
			} else {
				throw new Error('Error updating job listing.');
			}
		} catch (e) {
			let error = 'Error updating job listing.';
			if (axios.isAxiosError(e)) {
				if (e.code === 'ERR_NETWORK') {
					error = 'No internet connection';
				}
				if (e.response) {
					const { title } = e.response.data;
					if (title === 'INVALID_FIELDS') {
						error = 'Please provide all the necessary information.';
					}
				}
			}
			return Promise.reject(error);
		}
	}
}
