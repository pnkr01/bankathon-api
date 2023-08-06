import React, { useEffect } from 'react';
import { Job } from '../store/types/JobListingState';

export default function useJobDetails(userID: string | null) {
	const [jobDetails, setJobDetails] = React.useState({
		id: '',
		name: '',
		role: '',
		job_description: '',
		enhanced_jd: '',
		jd_processed: false,
		status: '',
	} as Job);
	const [error, setError] = React.useState(null);
	const [isLoading, setLoading] = React.useState(true);

	const getJobDetails = async (id: string | null) => {
		if (id === null) {
			setLoading(false);
			return;
		}
		// setLoading(true);
		// try {
		// 	const athlete = await AthleteService.getInstance().getAthlete(id);
		// 	setAthlete({ ...athlete, id });
		// } catch (err: any) {
		// 	setError(err);
		// } finally {
		// 	setLoading(false);
		// }
	};

	useEffect(() => {
		getJobDetails(userID);
	}, [userID]);

	return [jobDetails, isLoading, error] as [
		jobDetails: Job,
		isLoading: boolean,
		error: string | null
	];
}
