import type { FormEvent, ReactNode } from 'react'
import { createContext, useContext, useEffect, useState } from 'react'
import clsx from 'clsx'
import { Switch } from '@headlessui/react'

import { callAll } from '~/utils/misc'

interface Props {
  children: ReactNode
}

interface GetToggleProps {
  checked: boolean
  className?: string
  onChange?: (checked: FormEvent<HTMLButtonElement> | boolean) => void
}

interface TogglePropsContext {
  getToggleProps: (props: GetToggleProps) => GetToggleProps
  on: boolean
  setOn: (on: boolean) => void
  toggle: () => void
}

function Toggle({ children }: Props) {
  const [on, setOn] = useState(false)
  const toggle = () => setOn(!on)

  const getToggleProps = ({ onChange, className, checked, ...props }: GetToggleProps) => ({
    checked,
    className: clsx('', className),
    onChange: callAll(onChange, toggle),
    ...props,
  })

  return (
    <ToggleContext.Provider value={{ on, toggle, setOn, getToggleProps }}>
      {children}
    </ToggleContext.Provider>
  )
}

function ToggleOn({ children }: { children: ReactNode }) {
  const { on } = useToggle()
  return on ? children : null
}

function ToggleOff({ children }: { children: ReactNode }) {
  const { on } = useToggle()
  return on ? null : children
}

function ToggleButton({
  checked,
  children,
  ...props
}: {
  checked: boolean
  children: ReactNode
  className?: string
  onChange?: GetToggleProps['onChange']
}) {
  const { on, setOn, getToggleProps, toggle } = useToggle()
  const { onChange, ...toggleProps } = getToggleProps({ checked: on, ...props })

  useEffect(() => {
    if (checked) {
      setOn(checked)
    }
  }, [checked, setOn])

  return (
    <Switch onChange={onChange || toggle} {...toggleProps}>
      {children}
    </Switch>
  )
}

const ToggleContext = createContext<TogglePropsContext>({} as TogglePropsContext)
ToggleContext.displayName = 'ToggleContext'

function useToggle() {
  const context = useContext(ToggleContext)

  if (!context) {
    throw new Error(`useToggle must be used within a <Toggle />`)
  }

  return context
}

export default Object.assign(Toggle, {
  On: ToggleOn,
  Off: ToggleOff,
  Button: ToggleButton,
})
