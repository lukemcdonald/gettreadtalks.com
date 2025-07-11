import { useState } from 'react'
import * as Yup from 'yup'
import type { FieldProps } from 'formik'
import { ErrorMessage, Field, Form, Formik } from 'formik'
import { EyeIcon, EyeSlashIcon } from '@heroicons/react/24/outline'

import formStyles from '~/utils/styles/form'
import styles from '~/utils/styles'
import type { AuthProviderValue, AuthCredentials } from '~/context/auth'
import { FormErrorMessage } from '~/components/account/lib/error-message'
import { Toggle } from '~/components/toggle'
import { useAsync } from '~/hooks/async'
import { useAuth } from '~/context/auth'

interface Props {
  buttonText: string
  className?: string
  onSubmit: AuthProviderValue['updateSettings']
}

const initialValues = {
  authPassword: '',
  confirmPassword: '',
  password: '',
}

const validationSchema = Yup.object({
  authPassword: Yup.string().required('Enter your current password to update your password.'),
  confirmPassword: Yup.string().oneOf([Yup.ref('password')], 'Passwords must match.'),
  password: Yup.string().min(8, 'Must be at least eight characters long.'),
})

function SettingsPasswordForm({ buttonText = 'Submit', className, onSubmit }: Props) {
  const { isError, error, run } = useAsync()
  const { profile } = useAuth()
  const [showAuth, setShowAuth] = useState(false)
  const [showPassword, setShowPassword] = useState(false)

  function toggleShowPassword() {
    setShowPassword(!showPassword)
  }

  function validate(values: Omit<AuthCredentials, 'email'>) {
    if (values.password && values.confirmPassword) {
      setShowAuth(values.password === values.confirmPassword)
    }
  }

  async function handleSubmit(
    values: Pick<AuthCredentials, 'password' | 'authPassword'>,
    actions: { resetForm: (props: Record<string, string>) => void },
  ) {
    const submitValues = {
      creds: {
        email: profile?.email || '',
        password: values.authPassword || '',
      },
      updates: {
        password: values.password,
      },
    }

    await run(onSubmit(submitValues))
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
        {isError ? <FormErrorMessage error={error} /> : null}

        <div className={formStyles.formRow}>
          <label htmlFor="password" className={formStyles.label}>
            New password
          </label>

          <Field name="password">
            {({ field }: FieldProps) => (
              <div className="relative">
                <input
                  type={showPassword ? 'text' : 'password'}
                  className={formStyles.field}
                  {...field}
                />
                <Toggle>
                  <Toggle.Button
                    checked={showPassword}
                    className="absolute top-0 bottom-0 right-0 w-9 border-l border-gray-300 p-2 text-gray-400 transition-colors hover:text-gray-600"
                    onChange={() => toggleShowPassword()}
                  >
                    <Toggle.Off>
                      <span className="sr-only">Show password</span>
                      <EyeIcon className="h-full w-full" />
                    </Toggle.Off>
                    <Toggle.On>
                      <span className="sr-only">Hide password</span>
                      <EyeSlashIcon className="h-full w-full text-gray-600" />
                    </Toggle.On>
                  </Toggle.Button>
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

        {showAuth ? (
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
                {buttonText}
              </button>
            </div>
          </>
        ) : null}
      </Form>
    </Formik>
  )
}

export { SettingsPasswordForm }
