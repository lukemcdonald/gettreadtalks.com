import { ErrorMessage, Field, Form, Formik } from 'formik'
import React, { useState } from 'react'
import * as Yup from 'yup'

import { FormErrorMessage } from '~/components/account/lib/error-message'
import styles from '~/components/styles'
import formStyles from '~/components/styles/form'
import { useAuth } from '~/context/auth'
import { useAsync } from '~/hooks/async'

function SettingsEmailForm({ className, buttonText, onSubmit }) {
  const { isError, error, run } = useAsync()
  const { profile } = useAuth()
  const [showAuth, setShowAuth] = useState(false)

  const initialValues = {
    email: profile?.email || '',
    password: '',
  }

  const validationSchema = Yup.object({
    email: Yup.string().email('Invalid email address').required('Email required.'),
    password: Yup.string().required('Your current password is required to update the email.'),
  })

  function validate(values) {
    if (values.email) {
      setShowAuth(values.email.toLowerCase() !== profile.email.toLowerCase())
    }
  }

  function handleSubmit(values) {
    run(
      onSubmit({
        credentials: {
          email: profile.email,
          password: values.password,
        },
        updates: {
          email: values.email,
        },
      }),
    )
  }

  return (
    <Formik
      initialValues={initialValues}
      validationSchema={validationSchema}
      validate={(v) => validate(v)}
      onSubmit={(v) => handleSubmit(v)}
    >
      <Form className={className}>
        {isError && <FormErrorMessage error={error} />}

        <div className={formStyles.formRow}>
          <label htmlFor="email" className={formStyles.label && 'hidden'}>
            Email address
          </label>
          <Field name="email" type="email" className={formStyles.field} />
          <ErrorMessage name="email" component="div" className={formStyles.fieldError} />
        </div>

        {showAuth && (
          <>
            <div className={formStyles.formRow}>
              <label htmlFor="password" className={formStyles.label}>
                Password
              </label>
              <Field name="password" type="password" className={formStyles.field} />
              <ErrorMessage name="password" component="div" className={formStyles.fieldError} />
            </div>

            <div className={formStyles.formRow}>
              <button type="submit" className={styles.button}>
                {buttonText || 'Submit'}
              </button>
            </div>
          </>
        )}
      </Form>
    </Formik>
  )
}

export { SettingsEmailForm }
