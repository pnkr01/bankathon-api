import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { StoreNames } from '../config';
import JobListingState, { Job } from '../types/JobListingState';

const initialState: JobListingState = {
	isLoading: false,
	searchText: '',
	jobs: [],
	filteredJobs: [],
	jobDetail: {
		id: '',
		name: '',
		role: '',
		status: '',
		job_description: '',
		enhanced_description: '',
		skill_set: '',
	},

	errorFetchingJobs: '',
	errorFetchingJobDetails: '',
	errorSavingData: '',
};

const AthleteSlice = createSlice({
	name: StoreNames.JOB_LISTING,
	initialState,
	reducers: {
		reset: (state) => {
			state.isLoading = initialState.isLoading;
			state.searchText = initialState.searchText;
			state.jobs = initialState.jobs;
			state.filteredJobs = initialState.filteredJobs;
			state.jobDetail = initialState.jobDetail;

			state.errorFetchingJobs = initialState.errorFetchingJobs;
			state.errorFetchingJobDetails = initialState.errorFetchingJobDetails;
			state.errorSavingData = initialState.errorSavingData;
		},
		setLoading: (state, action: PayloadAction<boolean>) => {
			state.isLoading = action.payload;
		},
		setSearchText: (state, action: PayloadAction<string>) => {
			state.searchText = action.payload;

			if (state.searchText === '') {
				state.filteredJobs = state.jobs;
			} else {
				state.filteredJobs = state.jobs.filter(
					(job) =>
						job.name.toLowerCase().startsWith(state.searchText.toLowerCase()) ||
						job.role.toLowerCase().startsWith(state.searchText.toLowerCase())
				);
			}
		},
		setJobs: (state, action: PayloadAction<JobListingState['jobs']>) => {
			state.jobs = action.payload;
			state.filteredJobs = action.payload;
		},
		setSelectedJob: (state, action: PayloadAction<Job>) => {
			state.jobDetail = action.payload;
		},
		setErrorFetchingJobs: (state, action: PayloadAction<string>) => {
			state.errorFetchingJobs = action.payload;
		},
		setErrorFetchingJobDetails: (state, action: PayloadAction<string>) => {
			state.errorFetchingJobDetails = action.payload;
		},
		setErrorSavingData: (state, action: PayloadAction<string>) => {
			state.errorSavingData = action.payload;
		},

		setName: (state, action: PayloadAction<string>) => {
			state.jobDetail.name = action.payload;
		},
		setRole: (state, action: PayloadAction<string>) => {
			state.jobDetail.role = action.payload;
		},
		setSkillSet: (state, action: PayloadAction<string>) => {
			state.jobDetail.skill_set = action.payload;
		},
		setJobDescription: (state, action: PayloadAction<string>) => {
			state.jobDetail.job_description = action.payload;
		},
		setEnhancedJD: (state, action: PayloadAction<string>) => {
			state.jobDetail.enhanced_description = action.payload;
		},
	},
});

export const {
	reset,
	setLoading,
	setSearchText,
	setJobs,
	setSelectedJob,
	setErrorFetchingJobs,
	setErrorFetchingJobDetails,
	setErrorSavingData,
	setName,
	setRole,
	setJobDescription,
	setSkillSet,
	setEnhancedJD,
} = AthleteSlice.actions;

export default AthleteSlice.reducer;
