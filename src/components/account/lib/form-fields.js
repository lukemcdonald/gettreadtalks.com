import React from 'react'
import { useField } from 'formik'
import formStyles from 'components/styles/form'
import classNames from 'classnames'

function TextInput({ label, ...props }) {
  const [field] = useField(props)
  const name = props.id || props.name
  const styles = props?.classNames || {}

  return (
    <>
      <label className={classNames(formStyles.label, styles?.label)} htmlFor={name}>
        {label}
      </label>
      <input className={classNames(formStyles.field, styles?.input)} {...field} {...props} />
    </>
  )
}

function Checkbox({ children, ...props }) {
  const [field] = useField(props)
  const name = props.id || props.name
  const styles = props?.classNames || {}

  return (
    <label className={classNames(formStyles.label, styles?.label)} htmlFor={name}>
      <input className={classNames(formStyles.field, styles?.input)} type="checkbox" {...field} {...props} />
      {children}
    </label>
  )
}

function Select({ label, ...props }) {
  const [field] = useField(props)
  const name = props.id || props.name
  const styles = props?.classNames || {}

  return (
    <>
      <label className={classNames(formStyles.label, styles?.label)} htmlFor={name}>
        {label}
      </label>
      <select className={classNames(formStyles.field, styles?.input)} {...field} {...props} />
    </>
  )
}

export { TextInput, Checkbox, Select }
