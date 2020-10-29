// const { fontFamily } = require(`tailwindcss/defaultTheme`);

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
			},
			maxWidth: {
				'65ch': '65ch',
			},
		},
		container: {
			center: true,
		},
		typography: (theme) => ({
			default: {
				css: {
					color: theme('colors.inherit'),
					strong: {
						color: theme('colors.gray.900'),
					},
					'ol > li::before': {
						color: theme('colors.gray.600'),
					},
					'ul > li::before': {
						backgroundColor: theme('colors.gray.400'),
					},
					hr: {
						borderColor: theme('colors.gray.300'),
					},
					blockquote: {
						color: theme('colors.gray.900'),
						borderLeftColor: theme('colors.red.600'),
					},
					h1: {
						color: theme('colors.black'),
					},
					h2: {
						color: theme('colors.black'),
					},
					h3: {
						color: theme('colors.black'),
					},
					h4: {
						color: theme('colors.black'),
					},
					'figure figcaption': {
						color: theme('colors.gray.600'),
					},
					code: {
						color: theme('colors.gray.900'),
					},
					pre: {
						color: theme('colors.gray.900'),
						backgroundColor: theme('colors.gray.300'),
					},
					thead: {
						color: theme('colors.gray.900'),
						borderBottomColor: theme('colors.gray.400'),
					},
					'tbody tr': {
						borderBottomColor: theme('colors.gray.300'),
					},
				},
			},
		}),
	},
	plugins: [
		require('@tailwindcss/custom-forms'),
		require('@tailwindcss/typography'),
	],
};
