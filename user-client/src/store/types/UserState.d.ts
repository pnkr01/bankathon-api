type UserState = {
	searchText: string;
	kycOnly: boolean;
	users: {
		id: string;
		name: string;
		phone: string;
		kyc_verified: boolean;
	}[];
	filteredUsers: {
		id: string;
		name: string;
		phone: string;
		kyc_verified: boolean;
	}[];
	userDetails: User;

	errorFetchingUsers: string;
	errorFetchingUserDetails: string;
	errorSavingData: string;
};

export type User = {
	id: string;
	email: string;
	phone: string;
	first_name: string;
	last_name: string;
	gender: string;
	dob: string;
	photo: string;
	address: {
		care_of: string;
		country: string;
		district: string;
		landmark: string;
		locality: string;
		pincode: string;
		state: string;
		sub_district: string;
	};
};

export default UserState;
