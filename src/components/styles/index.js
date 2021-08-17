import classNames from 'classnames'

const textButton =
	'text-sm font-medium focus:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75'

const button = classNames(
	textButton,
	'px-4 py-2 bg-gray-600 hover:bg-opacity-80 text-white rounded-md'
)

export default { textButton, button }
