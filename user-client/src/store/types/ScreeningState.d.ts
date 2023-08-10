type ScreeningState = {
	isLoading: boolean;
	searchText: string;
	jobs: ScreeningDetails[];
	filteredJobs: ScreeningDetails[];
	screeningDetails: {
		applicant_id: string;
		job_title: string;
		job_role: string;
		questions: {
			question_id: string;
			question: string;
			answer: string;
		}[];
	};

	errorFetchingJobs: string;
	errorFetchingJobDetails: string;
	errorSavingData: string;
};

export type ScreeningDetails = {
	applicant_id: string;
	job_title: string;
	job_role: string;
	status: string;
};

export default ScreeningState;
