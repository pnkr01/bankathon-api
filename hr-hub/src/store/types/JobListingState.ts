type JobListingState = {
	searchText: string;
	jobs: Job[];
	filteredJobs: Job[];
	jobDetail: Job;

	errorFetchingJobs: string;
	errorFetchingJobDetails: string;
	errorSavingData: string;
};

export type Job = {
	id: string;
	name: string;
	role: string;
	jd_processed: boolean;
	status: string;
	job_description: string;
	enhanced_jd: string;
	skill_set: string;
};

export default JobListingState;
