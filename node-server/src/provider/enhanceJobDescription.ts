import axios from 'axios';

export default function enhanceJobDescription(id: string, description: string) {
	try {
		const {data} = axios.post('http://localhost:5000/enhanceJobDescription', {
			request_id: id,
			description: description,
		});
        return 
	} catch (e) {
		console.log(e);
	}
}
