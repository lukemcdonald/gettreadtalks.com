import type { ChangeEvent, ReactNode } from 'react'
import { navigate } from 'gatsby'
import clsx from 'clsx'
import { ChevronDownIcon } from '@heroicons/react/20/solid'
import { Field, Form, Formik } from 'formik'
import SelectGroup from './select-group'

export interface SelectOption {
  label?: string
  separator?: boolean | string
  value?: string
}

interface Props {
  children: ReactNode
  className?: string
  current?: SelectOption
  label?: string
}

function Select({ children, className, current, label }: Props) {
  const selectLabel = current?.label || label
  const selectValue = current?.value || ''

  return (
    <div className={clsx('relative inline-block', className)}>
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
              onChange={(event: ChangeEvent<HTMLSelectElement>) => {
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
