const { fontFamily } = require(`tailwindcss/defaultTheme`);

module.exports = {
	future: {
		removeDeprecatedGapUtilities: true,
		purgeLayersByDefault: true,
	},
	purge: {
		// enabled: false,
		content: ['./src/**/*.js', './src/**/*.css'],
		options: {
			whitelist: [],
		},
	},
	theme: {
		extend: {
			borderRadius: {
				lg: '1.875rem',
			},
			fontSize: {
				'4xl': ['2.5rem', '1.375'],
			},
			maxWidth: {
				'65ch': '65ch', // 770 in design, 768 using tailwindcss max-w-3xl
			},
			screens: {
				xl: '1152px', // 1170 in design
			},
		},
		colors: {
			current: 'currentColor',
			inherit: 'inherit',
			transparent: 'transparent',
			white: '#ffffff',
			black: '#000000',
			// New Tailwind Gray colors in 2.x.
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
			// Theme colors.
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
			secondary: {
				50: 'var(--color-secondary-50)',
				100: 'var(--color-secondary-100)',
				200: 'var(--color-secondary-200)',
				300: 'var(--color-secondary-300)',
				400: 'var(--color-secondary-400)',
				500: 'var(--color-secondary-500)',
				600: 'var(--color-secondary-600)',
				700: 'var(--color-secondary-700)',
				800: 'var(--color-secondary-800)',
				900: 'var(--color-secondary-900)',
			},
			tertiary: {
				50: 'var(--color-tertiary-50)',
				100: 'var(--color-tertiary-100)',
				200: 'var(--color-tertiary-200)',
				300: 'var(--color-tertiary-300)',
				400: 'var(--color-tertiary-400)',
				500: 'var(--color-tertiary-500)',
				600: 'var(--color-tertiary-600)',
				700: 'var(--color-tertiary-700)',
				800: 'var(--color-tertiary-800)',
				900: 'var(--color-tertiary-900)',
			},
		},
		container: {
			center: true,
		},
		fontFamily: {
			sans: ['Public Sans', ...fontFamily.sans],
			'sans-alt': ['Oswald', ...fontFamily.sans],
		},
		customForms: (theme) => ({
			default: {
				'input, textarea, multiselect, select': {
					borderRadius: theme('borderRadius.none'),
					borderColor: theme('colors.gray.300'),
					color: theme('colors.primary.800'),
					paddingTop: theme('spacing.3'),
					paddingBottom: theme('spacing.3'),
				},
			},
		}),
		typography: (theme) => ({
			default: {
				css: {
					maxWidth: 'none',
					color: theme('colors.inherit'),
					'[class~="lead"]': {
						color: theme('colors.inherit'),
						fontSize: theme('fontSize.3xl'),
					},
					a: {
						color: theme('colors.primary.600'),
					},
					strong: {
						color: theme('colors.primary.800'),
					},
					'ol > li::before': {
						color: theme('colors.primary.400'),
					},
					'ul > li::before': {
						backgroundColor: theme('colors.gray.400'),
					},
					hr: {
						borderColor: theme('colors.gray.300'),
					},
					blockquote: {
						color: theme('colors.gray.900'),
						borderLeftColor: theme('colors.gray.300'),
					},
					// h1: {
					// 	color: theme('colors.secondary.700'),
					// 	fontWeight: theme('fontWeight.medium'),
					// },
					// h2: {
					// 	color: theme('colors.secondary.700'),
					// 	fontWeight: theme('fontWeight.medium'),
					// },
					// h3: {
					// 	color: theme('colors.secondary.700'),
					// },
					// h4: {
					// 	color: theme('colors.secondary.700'),
					// },
					'figure figcaption': {
						color: theme('colors.gray.600'),
					},
					code: {
						color: theme('colors.primary.900'),
					},
					pre: {
						color: theme('colors.primary.300'),
						backgroundColor: theme('colors.gray.300'),
					},
					thead: {
						color: theme('colors.secondary.900'),
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
