type JobListingState = {
	isLoading: boolean;
	searchText: string;
	jobs: Job[];
	filteredJobs: Job[];
	jobDetail: Job;
	uploadedResume: File | null;

	errorFetchingJobs: string;
	errorFetchingJobDetails: string;
	errorSavingData: string;
};

export type Job = {
	id: string;
	name: string;
	role: string;
	status: string;
	job_description: string;
	enhanced_description: string;
	skill_set: string;
};

export default JobListingState;
