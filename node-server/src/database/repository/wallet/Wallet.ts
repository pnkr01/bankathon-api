import mongoose, { Types } from 'mongoose';
import { IWallet } from '../../../types/wallet';

const walletSchema = new mongoose.Schema<IWallet>(
	{
		user: {
			type: Types.ObjectId,
			ref: 'User',
		},
		balance: {
			type: Number,
			default: 0,
		},
	},
	{ timestamps: true }
);

const Wallet = mongoose.model<IWallet>('Wallet', walletSchema);

export default Wallet;
