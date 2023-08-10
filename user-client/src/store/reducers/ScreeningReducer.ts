import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { StoreNames } from '../config';
import ScreeningState from '../types/ScreeningState';

const initialState: ScreeningState = {
	isLoading: false,
	searchText: '',
	jobs: [],
	filteredJobs: [],
	screeningDetails: {
		applicant_id: '',
		job_title: '',
		job_role: '',
		questions: [],
	},

	errorFetchingJobs: '',
	errorFetchingJobDetails: '',
	errorSavingData: '',
};

const ScreeningSlice = createSlice({
	name: StoreNames.JOB_LISTING,
	initialState,
	reducers: {
		reset: (state) => {
			state.isLoading = initialState.isLoading;
			state.searchText = initialState.searchText;
			state.jobs = initialState.jobs;
			state.filteredJobs = initialState.filteredJobs;
			state.screeningDetails = initialState.screeningDetails;

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
						job.job_title.toLowerCase().startsWith(state.searchText.toLowerCase()) ||
						job.job_role.toLowerCase().startsWith(state.searchText.toLowerCase())
				);
			}
		},
		setJobs: (state, action: PayloadAction<ScreeningState['jobs']>) => {
			state.jobs = action.payload;
			state.filteredJobs = action.payload;
		},
		setSelectedScreening: (state, action: PayloadAction<ScreeningState['screeningDetails']>) => {
			state.screeningDetails = action.payload;
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
	},
});

export const {
	reset,
	setLoading,
	setSearchText,
	setJobs,
	setSelectedScreening,
	setErrorFetchingJobs,
	setErrorFetchingJobDetails,
	setErrorSavingData,
} = ScreeningSlice.actions;

export default ScreeningSlice.reducer;
