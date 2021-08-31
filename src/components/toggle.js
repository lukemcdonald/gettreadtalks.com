import * as React from 'react'
import { Switch } from '@headlessui/react'
import { callAll } from 'utils/misc'
import classNames from 'classnames'

const ToggleContext = React.createContext()
ToggleContext.displayName = 'ToggleContext'

function useToggle() {
	const context = React.useContext(ToggleContext)
	if (!context) {
		throw new Error(`useToggle must be used within a <Toggle />`)
	}
	return context
}

function Toggle({ children }) {
	const [on, setOn] = React.useState(false)
	const toggle = () => setOn(!on)

	const getToggleProps = ({ onChange, className, ...props } = {}) => ({
		className: classNames('', className),
		onChange: callAll(onChange, toggle),
		...props,
	})

	return (
		<ToggleContext.Provider value={{ on, toggle, setOn, getToggleProps }}>
			{children}
		</ToggleContext.Provider>
	)
}

function ToggleOn({ children }) {
	const { on } = useToggle()
	return on ? children : null
}

function ToggleOff({ children }) {
	const { on } = useToggle()
	return on ? null : children
}

function ToggleButton({ checked, ...props }) {
	const { on, setOn, getToggleProps } = useToggle()

	React.useEffect(() => {
		if (checked === null) return null
		setOn(checked)
	}, [checked, setOn])

	return <Switch {...getToggleProps({ checked: on, ...props })} />
}

export { Toggle, ToggleOn, ToggleOff, ToggleButton }
