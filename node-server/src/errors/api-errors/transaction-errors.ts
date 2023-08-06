import { ServerError } from '../../types';

const TRANSACTION_ERRORS = {
	INSUFFICIENT_FUNDS: {
		STATUS: 400,
		TITLE: 'INSUFFICIENT_FUNDS',
		MESSAGE: 'The account does not have enough funds to complete the transaction',
	},
	NFT_OUT_OF_STOCK: {
		STATUS: 400,
		TITLE: 'NFT_OUT_OF_STOCK',
		MESSAGE: 'NFT is out of stock.',
	},
} satisfies {
	[error: string]: ServerError;
};

export default TRANSACTION_ERRORS;
