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
					score: number;
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
}
