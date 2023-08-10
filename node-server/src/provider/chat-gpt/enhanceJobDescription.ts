import axios from 'axios';
import InternalError, { INTERNAL_ERRORS } from '../../errors/internal-errors';
import { PYTHON_SERVER_URL } from '../../config/const';

export default async function enhanceJobDescription(id: string, description: string) {
	try {
		const { data } = await axios.post(`${PYTHON_SERVER_URL}/enhance_jd`, {
			request_id: id,
			job_description: description,
		});

		return Promise.resolve({
			request_id: data.request_id,
			enhanced_description: data.enhanced_jd,
		});
	} catch (e) {
		console.log(e);

		return Promise.reject(new InternalError(INTERNAL_ERRORS.COMMON_ERRORS.INTERNAL_SERVER_ERROR));
	}
}
