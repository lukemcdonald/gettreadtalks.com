import React, { useState } from 'react'
import * as Yup from 'yup'
import { ErrorMessage, Formik, Field, Form } from 'formik'
import { EyeIcon, EyeOffIcon } from '@heroicons/react/outline'

import { useAsync } from 'hooks/async'
import { useAuth } from 'context/auth'
import { Toggle, ToggleButton, ToggleOff, ToggleOn } from 'components/toggle'
import { FormErrorMessage } from 'components/account/lib/error-message'

import styles from 'components/styles'
import formStyles from 'components/styles/form'

function SettingsPasswordForm({ className, buttonText, onSubmit }) {
  const { isError, error, run } = useAsync()
  const { profile } = useAuth()
  const [showAuth, setShowAuth] = useState(false)
  const [showPassword, setShowPassword] = useState(false)

  function toggleShowPassword() {
    setShowPassword(!showPassword)
  }

  const initialValues = {
    password: '',
    confirmPassword: '',
    authPassword: '',
  }

  const validationSchema = Yup.object({
    password: Yup.string().min(8, 'Must be at least eight characters long.'),
    confirmPassword: Yup.string().oneOf([Yup.ref('password'), null], 'Passwords must match.'),
    authPassword: Yup.string().required('Enter your current password to update your password.'),
  })

  function validate(values) {
    if (values.password && values.confirmPassword) {
      setShowAuth(values.password === values.confirmPassword)
    }
  }

  async function handleSubmit(values, actions) {
    await run(
      onSubmit({
        credentials: {
          email: profile.email,
          password: values.authPassword,
        },
        updates: {
          password: values.password,
        },
      }),
    )
    actions.resetForm({})
    setShowAuth(false)
  }

  return (
    <Formik
      initialValues={initialValues}
      validationSchema={validationSchema}
      validate={(v) => validate(v)}
      onSubmit={(v, a) => handleSubmit(v, a)}
    >
      <Form className={className}>
        {isError && <FormErrorMessage error={error} />}

        <div className={formStyles.formRow}>
          <label htmlFor="password" className={formStyles.label}>
            New password
          </label>

          <Field name="password">
            {({ field }) => (
              <div className="relative">
                <input type={showPassword ? 'text' : 'password'} className={formStyles.field} {...field} />
                <Toggle>
                  <ToggleButton
                    checked={showPassword}
                    onChange={() => toggleShowPassword()}
                    className="absolute top-0 bottom-0 right-0 p-2 text-gray-400 transition-colors border-l border-gray-300 w-9 hover:text-gray-600"
                  >
                    <ToggleOff>
                      <span className="sr-only">Show password</span>
                      <EyeIcon className="w-full h-full" />
                    </ToggleOff>
                    <ToggleOn>
                      <span className="sr-only">Hide password</span>
                      <EyeOffIcon className="w-full h-full text-gray-600" />
                    </ToggleOn>
                  </ToggleButton>
                </Toggle>
              </div>
            )}
          </Field>

          <ErrorMessage name="password" component="div" className={formStyles.fieldError} />
        </div>

        <div className={formStyles.formRow}>
          <label htmlFor="confirmPassword" className={formStyles.label}>
            Confirm new password
          </label>

          <Field name="confirmPassword" type="password" className={formStyles.field} />

          <ErrorMessage name="confirmPassword" component="div" className={formStyles.fieldError} />
        </div>

        {showAuth && (
          <>
            <div className={formStyles.formRow}>
              <label htmlFor="authPassword" className={formStyles.label}>
                Current password
              </label>

              <Field name="authPassword" type="password" className={formStyles.field} />

              <ErrorMessage name="authPassword" component="div" className={formStyles.fieldError} />
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

export { SettingsPasswordForm }
