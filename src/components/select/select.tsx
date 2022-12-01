import React from 'react'
import { navigate } from 'gatsby'
import classNames from 'classnames'
import { ChevronDownIcon } from '@heroicons/react/20/solid'
import { Field, Form, Formik } from 'formik'
import SelectGroup from './select-group'

export interface SelectOption {
  label?: string
  separator?: boolean | string
  value?: string
}

interface Props {
  children: React.ReactNode
  className?: string
  current?: SelectOption
  label?: string
}

function Select({ children, className, current, label }: Props) {
  const selectLabel = current?.label || label
  const selectValue = current?.value || ''

  return (
    <div className={classNames('relative inline-block', className)}>
      <span>{selectLabel}</span>
      <ChevronDownIcon className="relative mb-px inline-block w-8" />

      <Formik
        initialValues={{ optionPath: selectValue }}
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
              onChange={(event: React.ChangeEvent<HTMLSelectElement>) => {
                handleChange(event)
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
