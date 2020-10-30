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
			maxHeight: {
				'screen-50': '50vh',
			},
			maxWidth: {
				'65ch': '65ch',
				'73ch': '73ch',
			},
			opacity: {
				15: '0.15',
			},
		},
		container: {
			center: true,
		},
		typography: (theme) => ({
			default: {
				css: {
					color: theme('colors.inherit'),
					'[class~="lead"]': {
						color: theme('colors.gray.600'),
					},
					a: {
						color: theme('colors.gray.900'),
					},
					strong: {
						color: theme('colors.gray.900'),
					},
					'ol > li::before': {
						color: theme('colors.gray.500'),
					},
					'ul > li::before': {
						backgroundColor: theme('colors.gray.300'),
					},
					hr: {
						borderColor: theme('colors.gray.200'),
					},
					blockquote: {
						color: theme('colors.gray.900'),
						borderLeftColor: theme('colors.gray.400'),
					},
					h1: {
						color: theme('colors.gray.900'),
					},
					h2: {
						color: theme('colors.gray.900'),
					},
					h3: {
						color: theme('colors.gray.900'),
					},
					h4: {
						color: theme('colors.gray.900'),
					},
					'h1, h2, h3, h4': {
						fontWeight: '700',
					},
					'figure figcaption': {
						color: theme('colors.gray.500'),
					},
					code: {
						color: theme('colors.gray.900'),
					},
					pre: {
						color: theme('colors.gray.200'),
						backgroundColor: theme('colors.gray.800'),
					},
					thead: {
						color: theme('colors.gray.900'),
						borderBottomColor: theme('colors.gray.300'),
					},
					'tbody tr': {
						borderBottomColor: theme('colors.gray.200'),
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
