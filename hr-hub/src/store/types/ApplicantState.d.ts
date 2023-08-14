import { Job } from './JobListingState';

type JobListingState = {
	isLoading: boolean;
	searchText: string;
	applicants: Applicant[];
	filteredApplicants: Applicant[];
	applicantDetail: Applicant;

	errorFetchingApplicants: string;
	errorFetchingApplicantDetails: string;
};

export type Applicant = {
	id: string;
	name: string;
	phone: string;
	email: string;
	gender: string;
	dob: string;
	resume: string;
	job: Job;
	score: number | undefined;
};

export default JobListingState;
