import mongoose, { Schema } from 'mongoose';
import { IUser } from '../../../types/users';
import { USER_TYPES } from '../../../config/const';

const userSchema = new Schema<IUser>(
	{
		email: {
			type: String,
			required: true,
		},
		notificationToken: {
			type: String,
		},
		role: {
			type: String,
			enum: USER_TYPES,
			default: USER_TYPES.USER,
		},
		isAccountActive: {
			type: Boolean,
			default: true,
		},
		isAccountVerified: {
			type: Boolean,
			default: false,
		},
	},
	{ timestamps: true }
);

const User = mongoose.model<IUser>('User', userSchema);

export default User;
