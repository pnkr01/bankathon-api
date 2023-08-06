import { ServerError } from '../../types';

const NFT_ERRORS = {
	OUT_OF_STOCK: {
		STATUS: 400,
		TITLE: 'NFT_OUT_OF_STOCK',
		MESSAGE: 'NFT is out of stock.',
	},
} satisfies {
	[error: string]: ServerError;
};

export default NFT_ERRORS;
