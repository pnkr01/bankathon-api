import { configureStore } from '@reduxjs/toolkit';

import { StoreNames } from './config';
import JobListingReducer from './reducers/JobListingReducer';
import AuthReducer from './reducers/AuthReducer';
import UserReducer from './reducers/UserReducer';
import ContractReducer from './reducers/ContractReducer';
import BugReducer from './reducers/BugReducer';

const store = configureStore({
	reducer: {
		[StoreNames.AUTH]: AuthReducer,
		[StoreNames.JOB_LISTING]: JobListingReducer,
		[StoreNames.USERS]: UserReducer,
		[StoreNames.CONTRACT]: ContractReducer,
		[StoreNames.BUG]: BugReducer,
	},
	middleware: (getDefaultMiddleware) =>
		getDefaultMiddleware({
			serializableCheck: false,
		}),
});

export default store;

export type StoreState = ReturnType<typeof store.getState>;
