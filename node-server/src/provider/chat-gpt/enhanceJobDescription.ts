import axios from 'axios';
import InternalError, { INTERNAL_ERRORS } from '../../errors/internal-errors';

export default async function enhanceJobDescription(id: string, description: string) {
	try {
		const { data } = await axios.post('http://localhost:5000/enhance_jd', {
			request_id: id,
			description: description,
		});

		return Promise.resolve({
			request_id: data.request_id,
			enhanced_description: data.enhanced_jd,
		});
	} catch (e) {
		return Promise.reject(new InternalError(INTERNAL_ERRORS.COMMON_ERRORS.INTERNAL_SERVER_ERROR));
	}
}
