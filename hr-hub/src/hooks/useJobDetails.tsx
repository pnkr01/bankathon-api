import React, { useEffect } from 'react';
import { Job } from '../store/types/JobListingState';
import JobService from '../services/job.service';

export default function useJobDetails(userID: string | null) {
	const [jobDetails, setJobDetails] = React.useState({
		id: '',
		name: '',
		role: '',
		job_description: '',
		enhanced_description: '',
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
		setLoading(true);
		try {
			const job = await JobService.getInstance().getJob(id);
			setJobDetails({
				id: job.id,
				name: job.name,
				role: job.role,
				job_description: job.description,
				skill_set: job.skills.join(', '),
				enhanced_description: job.enhanced_description,
				jd_processed: job.status === 'JD_PROCESSED',
				status: job.status,
			});
		} catch (err: any) {
			setError(err);
		} finally {
			setLoading(false);
		}
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
