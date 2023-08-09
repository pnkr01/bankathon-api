import axios from 'axios';
import APIInstance from '../config/APIInstance';

export default class ApplicantService {
	private static instance: ApplicantService;

	private constructor() {
		// singleton
	}

	static getInstance(): ApplicantService {
		if (!ApplicantService.instance) {
			ApplicantService.instance = new ApplicantService();
		}
		return ApplicantService.instance;
	}

	async getApplicants() {
		try {
			const { data } = await APIInstance.get('/applicants');
			return Promise.resolve(
				data.applicants as {
					id: string;
					name: string;
					email: string;
					phone: string;
					gender: string;
					dob: string;
					resume: string;
					job: {
						id: string;
						name: string;
						role: string;
						status: string;
						job_description: string;
						skills: string[];
					};
				}[]
			);
		} catch (e) {
			let error = 'Error fetching applicants';
			if (axios.isAxiosError(e)) {
				if (e.code === 'ERR_NETWORK') {
					error = 'No internet connection';
				}
			}
			return Promise.reject(error);
		}
	}

	async registerApplicant(job_id: string, resume: File) {
		const formData = new FormData();
		formData.append('job', job_id);
		formData.append('file', resume);

		try {
			await APIInstance.post('/applicants', formData, {
				headers: {
					'Content-Type': 'multipart/form-data',
				},
			});
			return Promise.resolve();
		} catch (e) {
			let error = 'Error registering. Please try again';
			if (axios.isAxiosError(e)) {
				if (e.code === 'ERR_NETWORK') {
					error = 'No internet connection';
				} else if (e.response?.data.title === 'ALREADY_EXISTS') {
					error = 'Already enrolled for this job';
				}
			}
			return Promise.reject(error);
		}
	}
}
