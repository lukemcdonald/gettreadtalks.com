const colors = require('tailwindcss/colors');

module.exports = {
	future: {
		removeDeprecatedGapUtilities: true,
		purgeLayersByDefault: true,
	},
	purge: {
		enabled: false,
		content: ['./src/**/*.js', './src/**/*.css'],
		options: {
			whitelist: [],
		},
	},
	theme: {
		colors: {
			inherit: 'inherit',
			transparent: 'transparent',
			current: 'currentColor',
			black: '#000',
			white: '#fff',
			gray: colors.coolGray,
			red: colors.red,
		},
		extend: {
			maxHeight: {
				'screen-50': '50vh',
			},
			maxWidth: {
				'65ch': '65ch',
				'73ch': '73ch',
			},
		},
		aspectRatio: {
			'16x9': [16, 9],
		},
		container: (theme) => ({
			center: true,
			padding: {
				DEFAULT: theme('padding.4'),
				sm: theme('padding.6'),
			},
		}),
	},
	variants: {
		extend: {
			aspectRatio: ['responsive'],
			opacity: ['disabled'],
			zIndex: ['hover'],
		},
	},
	plugins: [
		require('@tailwindcss/forms'),
		require('@tailwindcss/typography'),
		require('tailwindcss-responsive-embed'),
		require('tailwindcss-aspect-ratio'),
	],
};
