// todo: Use Formik
// https://devdojo.com/semirteskeredzic/create-forms-with-formik-and-firebase
import classNames from 'classnames'
import React, { useState } from 'react'

import { FormErrorMessage } from '~/components/account/lib/error-message'
import styles from '~/components/styles'
import formStyles from '~/components/styles/form'
import { useAsync } from '~/hooks/async'

function LoginForm({ className, buttonText, onSubmit, hiddenFields = [] }) {
  const { isError, error, run } = useAsync()
  const [state, setState] = useState({
    email: '',
    password: '',
  })

  function handleSubmit(event) {
    event.preventDefault()
    const { email, password } = state
    run(onSubmit({ email, password }))
  }

  function handleChange(event) {
    setState({ ...state, [event.target.id]: event.target.value })
  }

  return (
    <form onSubmit={handleSubmit} className={className}>
      {isError && <FormErrorMessage error={error} />}

      <div
        className={classNames(formStyles.formRow, hiddenFields.includes('email') ? 'hidden' : '')}
      >
        <label htmlFor="email" className={formStyles.label}>
          Email address
        </label>
        <input
          id="email"
          autoComplete="email"
          type="text"
          onChange={handleChange}
          value={state.email}
          className={formStyles.field}
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
          id="password"
          autoComplete="password"
          type="password"
          onChange={handleChange}
          value={state.password}
          className={formStyles.field}
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
