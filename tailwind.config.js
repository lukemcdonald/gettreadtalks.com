const { fontFamily } = require(`tailwindcss/defaultTheme`);

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
		extend: {
			colors: {
				current: 'currentColor',
				inherit: 'inherit',
				transparent: 'transparent',
			},
			maxWidth: {
				'65ch': '65ch',
			},
		},
		colors1: {
			current: 'currentColor',
			inherit: 'inherit',
			transparent: 'transparent',
			white: '#ffffff',
			black: '#000000',
			gray: {
				50: 'var(--color-gray-50)',
				100: 'var(--color-gray-100)',
				200: 'var(--color-gray-200)',
				300: 'var(--color-gray-300)',
				400: 'var(--color-gray-400)',
				500: 'var(--color-gray-500)',
				600: 'var(--color-gray-600)',
				700: 'var(--color-gray-700)',
				800: 'var(--color-gray-800)',
				900: 'var(--color-gray-900)',
			},
			primary: {
				50: 'var(--color-primary-50)',
				100: 'var(--color-primary-100)',
				200: 'var(--color-primary-200)',
				300: 'var(--color-primary-300)',
				400: 'var(--color-primary-400)',
				500: 'var(--color-primary-500)',
				600: 'var(--color-primary-600)',
				700: 'var(--color-primary-700)',
				800: 'var(--color-primary-800)',
				900: 'var(--color-primary-900)',
			},
		},
		container: {
			center: true,
		},
	},
	plugins: [
		require('@tailwindcss/custom-forms'),
		require('@tailwindcss/typography'),
	],
};
