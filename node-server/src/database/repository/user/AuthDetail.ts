import mongoose, { Types } from 'mongoose';
import { IAuthDetail } from '../../../types/users';
import jwt from 'jsonwebtoken';
import { JWT_EXPIRE, JWT_SECRET, REFRESH_EXPIRE, REFRESH_SECRET } from '../../../config/const';

const authDetailSchema = new mongoose.Schema<IAuthDetail>(
	{
		user: {
			type: Types.ObjectId,
			ref: 'User',
			required: true,
		},
		login_hash: {
			type: String,
			select: false,
		},
		refresh_token: {
			type: String,
			immutable: false,
		},
		refresh_token_expires: {
			type: Date,
		},
		isRevoked: {
			type: Boolean,
			default: false,
		},
		revoked_at: {
			type: Date,
		},
	},
	{ timestamps: true }
);

authDetailSchema.method('getAuthToken', function (): string {
	return jwt.sign({ id: this._id, role: this.user.role }, JWT_SECRET, {
		expiresIn: JWT_EXPIRE,
	});
});

authDetailSchema.method('getRefreshToken', function (): string {
	const token = jwt.sign({ id: this._id, role: this.user.role }, REFRESH_SECRET, {
		expiresIn: REFRESH_EXPIRE,
	});

	this.refresh_token = token;
	this.refresh_token_expires = new Date(Date.now() + 30 * 24 * 60 * 60 * 1000);
	return token;
});

const AuthDetail = mongoose.model<IAuthDetail>('AuthDetail', authDetailSchema);
export default AuthDetail;
