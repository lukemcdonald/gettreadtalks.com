import React, { Component } from 'react'
import { navigate } from 'gatsby'
import { Field, Form, Formik } from 'formik'
import classNames from 'classnames'
import { ChevronDownIcon } from '@heroicons/react/solid'

import { ConditionalWrapper } from 'components/conditional-wrapper'

const SelectGroup = ({ label, options }) => (
  <ConditionalWrapper condition={label} wrapper={(children) => <optgroup label={label}>{children}</optgroup>}>
    {options.map(({ label: text, value, separator, index }) =>
      separator ? (
        <option key={`${separator}-${index}`} disabled>
          {typeof separator === 'boolean' ? `─` : separator}
        </option>
      ) : (
        <option key={`${value}`} value={value}>
          {text}
        </option>
      ),
    )}
  </ConditionalWrapper>
)

class Select extends Component {
  static Group = SelectGroup

  render() {
    const { children, className, current = {}, label } = this.props

    return (
      <div className={classNames('relative inline-block', className)}>
        <span>{current.label || label}</span>
        <ChevronDownIcon className="relative mb-px -mr-8 inline-block w-8" />

        <Formik
          initialValues={{ optionPath: current.value || '' }}
          onSubmit={async (values) => {
            navigate(values.optionPath)
          }}
        >
          {({ handleChange, submitForm }) => (
            <Form className="absolute inset-0 -right-10 z-40 flex overflow-hidden opacity-0">
              <Field
                as="select"
                name="optionPath"
                className="flex-grow cursor-pointer border-0 bg-transparent bg-none p-0"
                onChange={(e) => {
                  handleChange(e)
                  submitForm()
                }}
              >
                {children}
              </Field>
            </Form>
          )}
        </Formik>
      </div>
    )
  }
}

export { Select }
