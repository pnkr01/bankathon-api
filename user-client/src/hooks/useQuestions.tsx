import React, { useEffect } from 'react';
import { Job } from '../store/types/JobListingState';
import JobService from '../services/job.service';

export default function useQuestions(userID: string | null | undefined) {
	const [questions, setQuestions] = React.useState<string[]>([]);
	const [error, setError] = React.useState(null);
	const [isLoading, setLoading] = React.useState(true);

	const getJobDetails = async (id: string | null | undefined) => {
		if (id === null || id === undefined) {
			setLoading(false);
			return;
		}
		setLoading(true);
		try {
			const questions = await JobService.getInstance().getScreeningQuestions(id);
			setQuestions(questions);
		} catch (err: any) {
			setError(err);
		} finally {
			setLoading(false);
		}
	};

	useEffect(() => {
		getJobDetails(userID);
	}, [userID]);

	return [questions, isLoading, error] as [
		questions: string[],
		isLoading: boolean,
		error: string | null
	];
}
