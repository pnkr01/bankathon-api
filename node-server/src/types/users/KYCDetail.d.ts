import { Types } from 'mongoose';
import IUser from './User';
import { IKYCReference } from '../decentro';

export default interface IKYCDetail extends Document {
	user: IUser;
	first_name: string;
	last_name: string;
	phone: string;
	gender: string;
	dob: Date;
	photo: string;

	address: {
		care_of: string;
		country: string;
		district: string;
		landmark: string;
		locality: string;
		pincode: string;
		state: string;
		sub_district: string;
	};
}
