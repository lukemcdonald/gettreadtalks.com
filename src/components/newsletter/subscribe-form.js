// todo: Hook up Formik and make it work with MailChimp
import { EnvelopeIcon as EmailIcon } from '@heroicons/react/24/outline'
import classNames from 'classnames'
import { ErrorMessage, Field, Form, Formik } from 'formik'
import React from 'react'
import * as Yup from 'yup'

import { FormErrorMessage } from '~/components/account/lib/error-message'
import styles from '~/components/styles'
import formStyles from '~/components/styles/form'
import { useNotification } from '~/context/notifications'
import { useAsync } from '~/hooks/async'

function SubscribeForm({ className, title, text, buttonText, onSubmit }) {
  const { isError, error, run } = useAsync()
  const { notify } = useNotification()

  const initialValues = {
    email: '',
  }

  const validationSchema = Yup.object({
    email: Yup.string().email('Invalid email address').required('Email required.'),
  })

  function handleSubmit(values, actions) {
    run(
      onSubmit(values.email, { FNAME: '', LNAME: '' }).then((data) => {
        actions.resetForm({})
        notify({
          title: data.result === 'error' ? 'Error!' : 'Success!',
          text: data.msg,
          icon: ({ className, ...props }) => (
            <EmailIcon
              className={classNames(
                className,
                data.result === 'error' ? 'text-status-error' : 'text-status-success',
              )}
              {...props}
            />
          ),
        })
      }),
    )
  }

  return (
    <div className={className}>
      <h3 className="text-sm font-semibold uppercase tracking-wider text-gray-400">{title}</h3>
      <p className="mt-4 text-base text-gray-500">{text}</p>

      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={(v, a) => handleSubmit(v, a)}
      >
        <Form className="mt-4 sm:flex sm:max-w-md">
          {isError && <FormErrorMessage error={error} />}

          <div className="w-full">
            <label htmlFor="email" className={formStyles.label && 'sr-only'}>
              Email address
            </label>
            <Field
              name="email"
              type="email"
              autoComplete="email"
              required
              placeholder="Enter your email"
              className={classNames(formStyles.field)}
            />
            <ErrorMessage name="email" component="div" className={formStyles.fieldError} />
          </div>

          <div className="sm:mt-px sm:ml-3 sm:flex-shrink-0">
            <button
              type="submit"
              className={classNames(styles.button, 'flex w-full items-center justify-center')}
            >
              {buttonText || 'Notify me'}
            </button>
          </div>
        </Form>
      </Formik>
    </div>
  )
}

export { SubscribeForm }
