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

	async getScreenings() {
		try {
			const { data } = await APIInstance.get('/job/screenings');
			const screenings = data.screenings.map((screening: any) => ({
				applicant_id: screening.applicant_id,
				job_title: screening.job_title,
				job_role: screening.job_role,
				status: screening.status,
			})) as {
				applicant_id: string;
				job_title: string;
				job_role: string;
				status: string;
			}[];
			return Promise.resolve(screenings);
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

	async getScreeningQuestions(id: string) {
		try {
			const { data } = await APIInstance.get(`/job/screenings/${id}/questions`);
			const questions = data.questions as string[];
			return Promise.resolve(questions);
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
}
