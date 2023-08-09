/** @type {import('tailwindcss').Config} */
module.exports = {
	content: ['./src/**/*.{js,jsx,ts,tsx}'],
	theme: {
		extend: {
			colors: {
				primary: '#FFC371',
				'primary-dark': '#FF5F6D',
				accent: '#2CA5FF',
				pink: {
					light: '#FFDADC',
					dark: '#FF676E',
				},
			},
		},
	},
	plugins: [require('@tailwindcss/line-clamp')],
};
