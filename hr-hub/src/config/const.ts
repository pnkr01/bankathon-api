export const SERVER_URL = process.env.REACT_APP_SERVER_URL as string;

export const COLORS = {
	PRIMARY: '#FFC371',
	SECONDARY: '#FF5F6D',
	PRIMARY_BACKGROUND: '#FFEEE2',
	BACKGROUND: '#FFDADC',
	BACKGROUND_DARK: '#FFC3C6',
	NAVBAR: '#292C33',
	LIGHT_GRAY: '#F2F2F2',
	LIGHT_CYAN: '#E0F7FA',
	GRAY: '#BDBDBD',
	WHITE: '#FFFFFF',
	OFF_WHITE: '#F8F8F8',

	GRADIENT_PRIMARY_SECONDARY: `linear(to-r, #FFC371, #FF5F6D)`,
	GRADIENT_SEPARATOR: `linear(to-r, #FF5F5F15, #FF5F5F,#FF5F5F15)`,
};

export const ROUTES = {
	HOME: '/',
	LOGIN: '/login',
	JOB_LISTINGS: 'job-listings',
	APPLICANTS: 'applicants',
};

export const EMAIL_REGEX = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
