import axios from 'axios';
import InternalError, { INTERNAL_ERRORS } from '../../errors/internal-errors';
import { PYTHON_SERVER_URL } from '../../config/const';
import fs from 'fs';
import FormData from 'form-data';

type Props = {
	job_description: string;
	resume_file: string;
	job_title: string;
};

export default async function generateScreeningQuestions({
	job_description,
	job_title,
	resume_file,
}: Props) {
	const formData = new FormData();
	formData.append(
		'file',
		fs.createReadStream(resume_file),
		Math.round(Math.random() * 1000000).toString() + '-resume.pdf'
	);
	formData.append('job_description', job_description);
	formData.append('job_title', job_title);

	try {
		const { data } = await axios.post(`${PYTHON_SERVER_URL}/screening_question`, formData, {
			headers: formData.getHeaders(),
		});

		return Promise.resolve(
			data.map((item: any) => ({
				question: item.Question as string,
				reference: item.Reference as string,
				type: item.Type as string,
				tag: item.Tag as string[],
			})) as {
				question: string;
				reference: string;
				type: string;
				tag: string[];
			}[]
		);
	} catch (e) {
		console.log(e);

		return Promise.reject(new InternalError(INTERNAL_ERRORS.COMMON_ERRORS.INTERNAL_SERVER_ERROR));
	}
}
