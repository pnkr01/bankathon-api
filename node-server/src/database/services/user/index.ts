import { Types } from 'mongoose';
import { JWT_SECRET, REFRESH_SECRET, USER_TYPES } from '../../../config/const';
import InternalError, { INTERNAL_ERRORS } from '../../../errors/internal-errors';
import DateUtils from '../../../utils/DateUtils';
import JWTUtils from '../../../utils/JWTUtils';
import OTPUtils from '../../../utils/OTPUtils';
import { UserDB, KYCDetailDB, AuthDetailDB } from '../../repository/user';
import { IUser } from '../../../types/users';

type KYCData = {
	first_name: string;
	last_name: string;
	phone: string;
	photo: string;
	gender: string;
	dob: Date;
};

export default class UserService {
	private user: IUser;

	public constructor(user: IUser) {
		this.user = user;
	}

	static async getServiceByUserId(userId: Types.ObjectId) {
		const user = await UserDB.findById(userId);
		if (user === null) {
			throw new InternalError(INTERNAL_ERRORS.COMMON_ERRORS.NOT_FOUND);
		}
		return new UserService(user);
	}

	static async createUser(props: { phone: string; role: string }) {
		return await UserDB.create(props);
	}

	static async getLoginOTP(email: string, role: string) {
		let user = await UserDB.findOne({ email, role });
		if (user === null) {
			user = await UserDB.create({ email });
		}
		if (user.isAccountActive === false) {
			throw new InternalError(INTERNAL_ERRORS.USER_ERRORS.INACTIVE_ACCOUNT);
		}
		const otp = OTPUtils.GenerateOTP();
		const hash = OTPUtils.HashOTP(email, otp);
		await AuthDetailDB.create({
			user: user._id,
			login_hash: hash,
		});

		return [otp, hash];
	}

	static async verifyLoginOTP(hash: string, otp: string) {
		const authDetails = await AuthDetailDB.findOne({ login_hash: hash })
			.populate('user')
			.select('+login_hash');

		if (authDetails === null) {
			throw new InternalError(INTERNAL_ERRORS.USER_ERRORS.NOT_FOUND);
		} else if (authDetails.user.isAccountActive === false) {
			throw new InternalError(INTERNAL_ERRORS.USER_ERRORS.INACTIVE_ACCOUNT);
		}
		const user = authDetails.user;

		const isOTPValid = OTPUtils.VerifyOTP(user.email, hash, otp);

		if (!isOTPValid || authDetails.login_hash !== hash) {
			throw new InternalError(INTERNAL_ERRORS.USER_ERRORS.INVALID_OTP);
		}

		authDetails.login_hash = undefined;

		const token = authDetails.getAuthToken();
		const refreshToken = authDetails.getRefreshToken();
		authDetails.save();

		const details = {
			id: user._id,
			email: user.email,
			phone: '',
			first_name: '',
			last_name: '',
			gender: '',
			dob: '',
		};

		const kycDetails = await KYCDetailDB.findOne({ user: user._id });
		if (kycDetails !== null) {
			details.gender = kycDetails.gender;
			details.dob = DateUtils.format(kycDetails.dob, 'YYYY-MM-DD');
			details.first_name = kycDetails.first_name;
			details.last_name = kycDetails.last_name;
			details.phone = kycDetails.phone;
		} else {
			await KYCDetailDB.create({
				user: user._id,
			});
		}
		return { token, refresh_token: refreshToken, user: details };
	}

	static async verifyToken(token: string) {
		const decoded = JWTUtils.decode(token, JWT_SECRET);

		if (decoded === null) {
			throw new InternalError(INTERNAL_ERRORS.USER_ERRORS.NOT_FOUND);
		}
		const { id } = decoded as { id: string; role: string };

		const authDetail = await AuthDetailDB.findById(id).populate('user');

		if (authDetail === null || authDetail.isRevoked || authDetail.user.isAccountActive === false) {
			throw new InternalError(INTERNAL_ERRORS.USER_ERRORS.NOT_FOUND);
		}

		const auth_token = authDetail.getAuthToken();
		return { user: authDetail.user, role: authDetail.user.role, auth_token };
	}

	static async refreshToken(refreshToken: string) {
		const decoded = JWTUtils.decode(refreshToken, REFRESH_SECRET);

		if (decoded === null) {
			throw new InternalError(INTERNAL_ERRORS.USER_ERRORS.NOT_FOUND);
		}

		const { id } = decoded as { id: string; role: string };

		const authDetails = await AuthDetailDB.findOne({
			_id: id,
			refresh_token: refreshToken,
		}).populate('user');

		if (
			authDetails === null ||
			authDetails.isRevoked === true ||
			DateUtils.getMomentNow().isAfter(DateUtils.getMoment(authDetails.refresh_token_expires))
		) {
			throw new InternalError(INTERNAL_ERRORS.USER_ERRORS.NOT_FOUND);
		}

		const token = authDetails.getAuthToken();
		return token;
	}

	static async logout(refreshToken: string) {
		const authDetails = await AuthDetailDB.findOne({ token: refreshToken });
		if (authDetails === null) {
			return;
		}
		authDetails.isRevoked = true;
		authDetails.revoked_at = DateUtils.getMomentNow().toDate();
		authDetails.save();
	}

	isAccountActive() {
		return this.user.isAccountActive;
	}

	async activateAccount() {
		this.user.isAccountActive = true;
		await this.user.save();
	}

	async getUserDetails() {
		const kyc_details = await KYCDetailDB.findOne({ user: this.user });

		const details = {
			id: this.user._id,
			email: this.user.email,
			phone: '',
			first_name: '',
			last_name: '',
			gender: '',
			dob: '',
			photo: '',
			address: {
				care_of: '',
				country: '',
				district: '',
				landmark: '',
				locality: '',
				pincode: '',
				state: '',
				sub_district: '',
			},
		};

		if (kyc_details !== null) {
			details.gender = kyc_details.gender;
			details.dob = DateUtils.format(kyc_details.dob, 'YYYY-MM-DD');
			details.first_name = kyc_details.first_name;
			details.last_name = kyc_details.last_name;
			details.phone = kyc_details.phone;
			details.photo = kyc_details.photo;
		}
		return details;
	}

	async updateDetails(details: Partial<KYCData>) {
		const kycDetails = await KYCDetailDB.findOne({ user: this.user });
		if (kycDetails === null) {
			throw new InternalError(INTERNAL_ERRORS.USER_ERRORS.NOT_FOUND);
		}
		if (details.first_name !== undefined) {
			kycDetails.first_name = details.first_name;
		}
		if (details.last_name !== undefined) {
			kycDetails.last_name = details.last_name;
		}
		if (details.dob !== undefined) {
			kycDetails.dob = details.dob;
		}

		if (details.phone !== undefined) {
			kycDetails.phone = details.phone;
		}

		if (details.gender !== undefined) {
			kycDetails.gender = details.gender;
		}
		await kycDetails.save();
	}

	static async getUsers() {
		const users = await UserDB.aggregate([
			{
				$match: {
					role: USER_TYPES.USER,
				},
			},
			{
				$lookup: {
					from: KYCDetailDB.collection.name,
					localField: '_id',
					foreignField: 'user',
					as: 'details',
				},
			},
			{ $addFields: { details: { $arrayElemAt: ['$details', 0] } } },
			{ $addFields: { first_name: '$details.first_name' } },
			{ $addFields: { last_name: '$details.last_name' } },
			{ $addFields: { kyc_status: '$details.status' } },
			{ $addFields: { name: { $concat: ['$first_name', ' ', '$last_name'] } } },
			{
				$project: {
					id: '$_id',
					_id: 0,
					email: 1,
					name: 1,
					kyc_status: 1,
				},
			},
		]);

		return users as {
			id: Types.ObjectId;
			email: string;
			name: string;
			kyc_status: string;
		}[];
	}
}
