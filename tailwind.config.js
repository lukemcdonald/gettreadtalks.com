const colors = require('tailwindcss/colors')

module.exports = {
  content: ['./src/**/*.{css,js}'],
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
      gray: colors.gray,
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
  plugins: [require('@tailwindcss/forms'), require('@tailwindcss/typography'), require('@tailwindcss/aspect-ratio')],
}
