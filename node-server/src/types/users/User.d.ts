import { Document } from 'mongoose';
import { USER_TYPES } from '../../config/const';

export default interface IUser extends Document {
	email: string;
	notificationToken: string | undefined;
	role: USER_TYPES;
	isAccountActive: boolean;
	isAccountVerified: boolean;
}
