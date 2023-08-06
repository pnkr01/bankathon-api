import mongoose, { Types } from 'mongoose';
import { IWalletTransaction } from '../../../types/wallet';
import {
	WALLET_ENTRY_TYPE,
	WALLET_TRANSACTION_STATUS,
	WALLET_TRANSACTION_TYPE,
} from '../../../config/const';

const walletTransactionSchema = new mongoose.Schema<IWalletTransaction>(
	{
		entry_type: {
			type: String,
			enum: Object.values(WALLET_ENTRY_TYPE),
			required: true,
		},

		wallet: {
			type: Types.ObjectId,
			ref: 'Wallet',
			required: true,
		},
		user: {
			type: Types.ObjectId,
			ref: 'User',
			required: true,
		},
		amount: {
			type: Number,
			default: 0,
			required: true,
		},
		balance: {
			type: Number,
		},
		description: {
			type: String,
		},
		reference_id: {
			type: String,
		},
		transaction_type: {
			type: String,
			enum: Object.values(WALLET_TRANSACTION_TYPE),
			required: true,
		},
		transaction_status: {
			type: String,
			enum: Object.values(WALLET_TRANSACTION_STATUS),
		},
		transaction_date: {
			type: Date,
			default: Date.now,
		},
	},
	{ timestamps: true }
);

const WalletTransaction = mongoose.model<IWalletTransaction>(
	'WalletTransaction',
	walletTransactionSchema
);

export default WalletTransaction;
