import { ChevronDownIcon } from '@heroicons/react/20/solid'
import classNames from 'classnames'
import { Field, Form, Formik } from 'formik'
import { navigate } from 'gatsby'
import React from 'react'

import SelectGroup from './select-group'

function Select({ children, className, current = {}, label }) {
  return (
    <div className={classNames('relative inline-block', className)}>
      <span>{current.label || label}</span>
      <ChevronDownIcon className="relative mb-px inline-block w-8" />

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

export default Object.assign(Select, {
  Group: SelectGroup,
})
