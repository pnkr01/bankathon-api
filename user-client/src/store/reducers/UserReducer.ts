import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { StoreNames } from '../config';
import UserState, { User } from '../types/UserState';

const initialState: UserState = {
	searchText: '',
	kycOnly: true,
	users: [],
	filteredUsers: [],
	userDetails: {
		id: '',
		first_name: '',
		last_name: '',
		dob: '',
		phone: '',
		email: '',
		gender: '',
		photo: '',
		address: {
			care_of: '',
			country: '',
			district: '',
			landmark: '',
			locality: '',
			pincode: '',
			state: '',
			sub_district: '',
		},
	},

	errorFetchingUserDetails: '',
	errorFetchingUsers: '',
	errorSavingData: '',
};

const AthleteSlice = createSlice({
	name: StoreNames.JOB_LISTING,
	initialState,
	reducers: {
		reset: (state) => {
			state.searchText = initialState.searchText;
			state.kycOnly = initialState.kycOnly;

			state.users = initialState.users;
			state.filteredUsers = initialState.filteredUsers;
			state.userDetails = initialState.userDetails;

			state.errorFetchingUsers = initialState.errorFetchingUsers;
			state.errorFetchingUserDetails = initialState.errorFetchingUserDetails;
			state.errorSavingData = initialState.errorSavingData;
		},
		setSearchText: (state, action: PayloadAction<string>) => {
			state.searchText = action.payload;

			if (state.searchText === '') {
				if (state.kycOnly) {
					state.filteredUsers = state.users.filter((user) => user.kyc_verified);
				} else {
					state.filteredUsers = state.users.filter((user) => !user.kyc_verified);
				}
			} else {
				if (state.kycOnly) {
					state.filteredUsers = state.users.filter(
						(user) =>
							user.kyc_verified &&
							user.name.toLowerCase().startsWith(state.searchText.toLowerCase())
					);
				} else {
					state.filteredUsers = state.users.filter(
						(user) =>
							!user.kyc_verified &&
							user.name.toLowerCase().startsWith(state.searchText.toLowerCase())
					);
				}
			}
		},
		toggleKYCOnly: (state, action: PayloadAction<void>) => {
			state.kycOnly = !state.kycOnly;
			state.searchText = '';
			if (state.kycOnly) {
				state.filteredUsers = state.users.filter((user) => user.kyc_verified);
			} else {
				state.filteredUsers = state.users.filter((user) => !user.kyc_verified);
			}
		},
		setUsers: (state, action: PayloadAction<UserState['users']>) => {
			state.users = action.payload;
			if (state.kycOnly) {
				state.filteredUsers = state.users.filter((user) => user.kyc_verified);
			} else {
				state.filteredUsers = state.users.filter((user) => !user.kyc_verified);
			}
		},
		setSelectedUser: (state, action: PayloadAction<User>) => {
			state.userDetails = action.payload;
		},
		setErrorFetchingUsers: (state, action: PayloadAction<string>) => {
			state.errorFetchingUsers = action.payload;
		},
		setErrorFetchingUsersDetails: (state, action: PayloadAction<string>) => {
			state.errorFetchingUserDetails = action.payload;
		},
		setErrorSavingData: (state, action: PayloadAction<string>) => {
			state.errorSavingData = action.payload;
		},
		setFirstName: (state, action: PayloadAction<string>) => {
			state.userDetails.first_name = action.payload;
		},
		setLastName: (state, action: PayloadAction<string>) => {
			state.userDetails.last_name = action.payload;
		},
		setDOB: (state, action: PayloadAction<string>) => {
			state.userDetails.dob = action.payload;
		},
		setPhone: (state, action: PayloadAction<string>) => {
			state.userDetails.phone = action.payload;
		},
		setEmail: (state, action: PayloadAction<string>) => {
			state.userDetails.email = action.payload;
		},
		setGender: (state, action: PayloadAction<string>) => {
			state.userDetails.gender = action.payload;
		},
		setCareOf: (state, action: PayloadAction<string>) => {
			state.userDetails.address.care_of = action.payload;
		},
		setCountry: (state, action: PayloadAction<string>) => {
			state.userDetails.address.country = action.payload;
		},
		setDistrict: (state, action: PayloadAction<string>) => {
			state.userDetails.address.district = action.payload;
		},
		setLocality: (state, action: PayloadAction<string>) => {
			state.userDetails.address.locality = action.payload;
		},
		setLandmark: (state, action: PayloadAction<string>) => {
			state.userDetails.address.landmark = action.payload;
		},
		setPincode: (state, action: PayloadAction<string>) => {
			state.userDetails.address.pincode = action.payload;
		},
		setState: (state, action: PayloadAction<string>) => {
			state.userDetails.address.state = action.payload;
		},
		setSubDistrict: (state, action: PayloadAction<string>) => {
			state.userDetails.address.sub_district = action.payload;
		},
	},
});

export const {
	reset,
	setSearchText,
	toggleKYCOnly,
	setUsers,
	setErrorFetchingUsers,
	setErrorFetchingUsersDetails,
	setErrorSavingData,
	setSelectedUser,
	setFirstName,
	setLastName,
	setDOB,
	setPhone,
	setEmail,
	setGender,
	setCareOf,
	setCountry,
	setDistrict,
	setLocality,
	setLandmark,
	setPincode,
	setState,
	setSubDistrict,
} = AthleteSlice.actions;

export default AthleteSlice.reducer;
