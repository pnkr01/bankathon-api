import axios from 'axios';
import InternalError, { INTERNAL_ERRORS } from '../../errors/internal-errors';
import { PYTHON_SERVER_URL } from '../../config/const';

export default async function screeningResult(questions: string[], answers: string[]) {
	try {
		const { data } = await axios.post(`${PYTHON_SERVER_URL}/screening_result`, {
			questions,
			answers,
		});

		return Promise.resolve(data as number[]);
	} catch (e) {
		console.log(e);

		return Promise.reject(new InternalError(INTERNAL_ERRORS.COMMON_ERRORS.INTERNAL_SERVER_ERROR));
	}
}
