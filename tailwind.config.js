const colors = require('tailwindcss/colors')
const tailwindForms = require('@tailwindcss/forms')
const tailwindTypography = require('@tailwindcss/typography')
const tailwindEmbeds = require('tailwindcss-responsive-embed')
const tailwindAspectRatio = require('tailwindcss-aspect-ratio')

module.exports = {
	// the NODE_ENV thing is for https://github.com/Acidic9/prettier-plugin-tailwind/issues/29
	mode: process.env.NODE_ENV ? 'jit' : undefined,
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
			status: {
				info: colors.blue[600],
				error: colors.red[600],
				success: colors.green[600],
			},
			favorite: {
				100: colors.red[100],
				200: colors.red[200],
				700: colors.red[700],
			},
			featured: {
				100: colors.blue[100],
				200: colors.blue[200],
				700: colors.blue[700],
			},
			finished: {
				100: colors.green[100],
				200: colors.green[200],
				700: colors.green[700],
			},
			gray: colors.coolGray,
			primary: colors.red,
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
			borderRadius: ['first', 'last'],
			display: ['group-hover'],
			opacity: ['disabled'],
			padding: ['hover'],
			zIndex: ['hover'],
		},
	},
	plugins: [
		tailwindForms,
		tailwindTypography,
		tailwindEmbeds,
		tailwindAspectRatio,
	],
}
