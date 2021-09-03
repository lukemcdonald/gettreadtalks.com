import classNames from 'classnames'

const textButton =
	'text-sm font-medium focus:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75'
const buttonStyle = classNames(textButton, 'px-4 py-2 rounded-md')

const button = classNames(
	buttonStyle,
	'text-gray-700 bg-gray-200 hover:bg-opacity-80'
)

const dangerButton = classNames(
	buttonStyle,
	'text-red-700 bg-red-100 hover:bg-red-200'
)

export default { button, dangerButton, textButton }
