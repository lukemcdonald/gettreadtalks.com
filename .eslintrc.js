module.exports = {
  extends: ['kentcdodds', 'kentcdodds/react', 'prettier'],
  plugins: ['prettier'],
  rules: {
    'react/jsx-props-no-spreading': 'off',
    'react/prop-types': 0,
    'no-shadow': 'off',
    'no-void': 'off',

    'no-console': 'off',
    '@babel/new-cap': 'off',
    'react/jsx-filename-extension': 'off',
    'react/jsx-pascal-case': 'off', // Allow for uppercase SEO component

    'react/jsx-no-useless-fragment': 'off',
    'consistent-return': 'off',
    'react/no-unescaped-entities': 'off',

  },
  settings: {
    'import/resolver': {
      node: {
        moduleDirectory: ['node_modules', 'src'],
      },
    },
  },
}
