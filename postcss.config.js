const autoprefixer = require(`autoprefixer`)
const postcssCustomProperties = require('postcss-custom-properties')

const postcssImport = require(`postcss-import`)
const postcssNested = require(`postcss-nested`)
const tailwindcss = require(`tailwindcss`)

module.exports = {
	plugins: [
		postcssImport,
		tailwindcss,
		postcssNested,
		postcssCustomProperties,
		autoprefixer,
	],
}
