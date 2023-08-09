import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { StoreNames } from '../config';
import { ApplicantsState } from '../types';

const initialState: ApplicantsState = {
	isLoading: false,
	searchText: '',
	applicants: [],
	filteredApplicants: [],
	applicantDetail: {
		id: '',
		name: '',
		phone: '',
		email: '',
		gender: '',
		dob: '',
		resume: '',
		job: {
			id: '',
			name: '',
			role: '',
			status: '',
			job_description: '',
			enhanced_description: '',
			skill_set: '',
		},
	},

	errorFetchingApplicants: '',
	errorFetchingApplicantDetails: '',
};

const ApplicantsSlice = createSlice({
	name: StoreNames.APPLICANTS,
	initialState,
	reducers: {
		reset: (state) => {
			state.isLoading = initialState.isLoading;
			state.searchText = initialState.searchText;
			state.applicants = initialState.applicants;
			state.filteredApplicants = initialState.filteredApplicants;
			state.applicantDetail = initialState.applicantDetail;

			state.errorFetchingApplicants = initialState.errorFetchingApplicants;
			state.errorFetchingApplicantDetails = initialState.errorFetchingApplicantDetails;
		},
		setLoading: (state, action: PayloadAction<boolean>) => {
			state.isLoading = action.payload;
		},
		setSearchText: (state, action: PayloadAction<string>) => {
			state.searchText = action.payload;

			if (state.searchText === '') {
				state.filteredApplicants = state.applicants;
			} else {
				state.filteredApplicants = state.applicants.filter(
					(applicant) =>
						applicant.name.toLowerCase().startsWith(state.searchText.toLowerCase()) ||
						applicant.job.name.toLowerCase().startsWith(state.searchText.toLowerCase()) ||
						applicant.job.role.toLowerCase().startsWith(state.searchText.toLowerCase())
				);
			}
		},
		setApplicants: (state, action: PayloadAction<ApplicantsState['applicants']>) => {
			state.applicants = action.payload;
			state.filteredApplicants = action.payload;
		},
		setSelectedApplicant: (state, action: PayloadAction<string>) => {
			const applicant = state.applicants.find((applicant) => applicant.id === action.payload);
			if (applicant) {
				state.applicantDetail = applicant;
			}
		},
		setErrorFetchingApplicants: (state, action: PayloadAction<string>) => {
			state.errorFetchingApplicants = action.payload;
		},
		setErrorFetchingApplicantDetails: (state, action: PayloadAction<string>) => {
			state.errorFetchingApplicantDetails = action.payload;
		},
	},
});

export const {
	reset,
	setLoading,
	setSearchText,
	setApplicants,
	setSelectedApplicant,
	setErrorFetchingApplicantDetails,
	setErrorFetchingApplicants,
} = ApplicantsSlice.actions;

export default ApplicantsSlice.reducer;
