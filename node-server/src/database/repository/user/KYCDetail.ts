import mongoose, { Types } from 'mongoose';
import { IKYCDetail } from '../../../types/users';

const kycDetailSchema = new mongoose.Schema<IKYCDetail>(
	{
		user: {
			type: Types.ObjectId,
			ref: 'User',
			required: true,
			unique: true,
		},
		first_name: {
			type: String,
		},
		last_name: {
			type: String,
		},
		phone: {
			type: String,
		},
		dob: {
			type: Date,
		},
		gender: {
			type: String,
		},
		photo: {
			type: String,
		},
		address: {
			care_of: { type: String },
			country: { type: String },
			district: { type: String },
			landmark: { type: String },
			locality: { type: String },
			pincode: { type: String },
			state: { type: String },
			sub_district: { type: String },
		},
	},
	{ timestamps: true }
);

const KYCDetail = mongoose.model<IKYCDetail>('KYCDetail', kycDetailSchema);
export default KYCDetail;
