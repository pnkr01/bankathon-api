import { Document } from 'mongoose';
import IUser from './User';

export default interface IAuthDetail extends Document {
	user: IUser;
	login_hash: string | undefined;
	refresh_token: string;
	refresh_token_expires: Date;

	isRevoked: boolean;
	revoked_at: Date;

	getAuthToken(): string;
	getRefreshToken(): string;
}
