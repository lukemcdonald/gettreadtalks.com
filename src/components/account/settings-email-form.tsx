import { useState } from 'react'
import { ErrorMessage, Field, Form, Formik } from 'formik'
import * as Yup from 'yup'

import formStyles from '~/utils/styles/form'
import styles from '~/utils/styles'
import type { AuthCredentials, AuthProviderValue } from '~/context/auth'
import { FormErrorMessage } from '~/components/account/lib/error-message'
import { useAsync } from '~/hooks/async'
import { useAuth } from '~/context/auth'

interface Props {
  buttonText: string
  className?: string
  onSubmit: AuthProviderValue['updateSettings']
}

const validationSchema = Yup.object({
  email: Yup.string().email('Invalid email address').required('Email required.'),
  password: Yup.string().required('Your current password is required to update the email.'),
})

function SettingsEmailForm({ buttonText = 'Submit', className, onSubmit }: Props) {
  const { isError, error, run } = useAsync()
  const { profile } = useAuth()
  const [showAuth, setShowAuth] = useState(false)

  const initialValues = {
    email: profile?.email || '',
    password: '',
  }

  function validate(values: AuthCredentials) {
    if (values.email) {
      setShowAuth(values.email.toLowerCase() !== profile?.email?.toLowerCase())
    }
  }

  function handleSubmit(values: AuthCredentials) {
    const submitValues = {
      creds: {
        email: profile?.email || '',
        password: values.password,
      },
      updates: {
        email: values.email,
      },
    }
    run(onSubmit(submitValues))
  }

  return (
    <Formik
      initialValues={initialValues}
      validationSchema={validationSchema}
      validate={(v) => validate(v)}
      onSubmit={(v) => handleSubmit(v)}
    >
      <Form className={className}>
        {isError ? <FormErrorMessage error={error} /> : null}

        <div className={formStyles.formRow}>
          <label htmlFor="email" className={formStyles.label && 'hidden'}>
            Email address
          </label>
          <Field name="email" type="email" className={formStyles.field} />
          <ErrorMessage name="email" component="div" className={formStyles.fieldError} />
        </div>

        {showAuth ? (
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
                {buttonText}
              </button>
            </div>
          </>
        ) : null}
      </Form>
    </Formik>
  )
}

export { SettingsEmailForm }
