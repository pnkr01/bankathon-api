import { Document } from 'mongoose';
import { JOB_STATUS } from '../../config/const';

export default interface IJob extends Document {
	name: string;
	role: string;
	description: string;
	skills: string[];
	enhanced_description: string;
	status: JOB_STATUS;
}
