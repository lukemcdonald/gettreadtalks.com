// todo: Use Formik
// https://devdojo.com/semirteskeredzic/create-forms-with-formik-and-firebase
import classNames from 'classnames'
import React, { useState } from 'react'

import { FormErrorMessage } from '~/components/account/lib/error-message'
import styles from '~/utils/styles'
import formStyles from '~/utils/styles/form'
import { useAsync } from '~/hooks/async'
import type { AuthCredentials } from '~/context/auth'

interface LoginFormProps {
  buttonText: string
  className?: string
  hiddenFields?: string[]
  onSubmit: (props: AuthCredentials) => Promise<void>
}

function LoginForm({ className, buttonText, onSubmit, hiddenFields = [] }: LoginFormProps) {
  const { isError, error, run } = useAsync()
  const [state, setState] = useState({
    email: '',
    password: '',
  })

  function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault()
    const { email, password } = state
    run(onSubmit({ email, password }))
  }

  function handleChange(event: React.ChangeEvent<HTMLInputElement>) {
    setState({ ...state, [event.target.id]: event.target.value })
  }

  return (
    <form onSubmit={handleSubmit} className={className}>
      {isError ? <FormErrorMessage error={error} /> : null}

      <div
        className={classNames(formStyles.formRow, hiddenFields.includes('email') ? 'hidden' : '')}
      >
        <label htmlFor="email" className={formStyles.label}>
          Email address
        </label>
        <input
          autoComplete="email"
          className={formStyles.field}
          id="email"
          onChange={handleChange}
          type="text"
          value={state.email}
        />
      </div>

      <div
        className={classNames(
          formStyles.formRow,
          hiddenFields.includes('password') ? 'hidden' : '',
        )}
      >
        <label htmlFor="password" className={formStyles.label}>
          Password
        </label>
        <input
          className={formStyles.field}
          id="password"
          onChange={handleChange}
          type="password"
          value={state.password}
        />
      </div>

      <div className={formStyles.formRow}>
        <button type="submit" className={styles.button}>
          {buttonText || 'Submit'}
        </button>
      </div>
    </form>
  )
}

export { LoginForm }
