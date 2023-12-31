import axios from 'axios';
import InternalError, { INTERNAL_ERRORS } from '../../errors/internal-errors';
import { PYTHON_SERVER_URL } from '../../config/const';
import fs from 'fs';
import FormData from 'form-data';

type Props = {
	job_description: string;
	resume_file: string;
	skills: string[];
};

export default async function analyzeCV({ job_description, skills, resume_file }: Props) {
	const formData = new FormData();
	formData.append(
		'file',
		fs.createReadStream(resume_file),
		Math.round(Math.random() * 1000000).toString() + '-resume.pdf'
	);
	formData.append('job_description', job_description);
	formData.append('skills', skills.join(','));

	try {
		const { data } = await axios.post(`${PYTHON_SERVER_URL}/analyze_cv`, formData, {
			headers: formData.getHeaders(),
		});

		return Promise.resolve(Number(data['score']));
	} catch (e) {
		console.log(e);

		return Promise.reject(new InternalError(INTERNAL_ERRORS.COMMON_ERRORS.INTERNAL_SERVER_ERROR));
	}
}
