const colors = require('tailwindcss/colors');

module.exports = {
	purge: {
		content: ['./src/**/*.js', './src/**/*.css'],
	},
	theme: {
		extend: {
			maxHeight: {
				'screen-50': '50vh',
			},
			maxWidth: {
				'65ch': '65ch',
				'73ch': '73ch',
			},
			typography: (theme) => ({
				DEFAULT: {
					css: {
						a: {
							color: theme('colors.current'),
						},
					},
				},
			}),
		},
		colors: {
			inherit: 'inherit',
			transparent: 'transparent',
			current: 'currentColor',
			black: '#000',
			white: '#fff',
			gray: colors.coolGray,
			red: colors.red,
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
			display: ['group-hover'],
			opacity: ['disabled'],
			borderRadius: ['first', 'last'],
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
