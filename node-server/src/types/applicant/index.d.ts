import { Document } from 'mongoose';
import { APPLICANT_STATUS } from '../../config/const';
import { IKYCDetail, IUser } from '../users';
import IJob from '../job';

export default interface IApplicant extends Document {
	user: IUser;
	user_details: IKYCDetail;
	job: IJob;
	resume: string;
	status: APPLICANT_STATUS;
}
