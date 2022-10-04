const config = {
	content: ['./src/**/*.{html,svelte}'],

	theme: {
		extend: {}
	},
	daisyui: {
		theme: "dracula"
	},
	plugins: [require('daisyui')]
};

module.exports = config;
