import { useState } from 'react'
import classNames from 'classnames'

import formStyles from '~/utils/styles/form'
import styles from '~/utils/styles'
import { FormErrorMessage } from '~/components/account/lib/error-message'
import { useAsync } from '~/hooks/async'

interface Props {
  buttonText: string
  className?: string
  onSubmit: (form: { password: string }) => Promise<void>
}

function DeactivateForm({ buttonText = 'Submit', className, onSubmit }: Props) {
  const { isError, error, run } = useAsync()
  const [state, setState] = useState({
    password: '',
  })

  function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault()
    const { password } = state
    run(onSubmit({ password }))
  }

  function handleChange(event: React.ChangeEvent<HTMLInputElement>) {
    setState({ ...state, [event.target.id]: event.target.value })
  }

  return (
    <form onSubmit={handleSubmit} className={className}>
      {isError ? <FormErrorMessage error={error} /> : null}

      <div className={classNames(formStyles.formRow)}>
        <label htmlFor="password" className={formStyles.label}>
          Password
        </label>
        <input
          autoFocus
          className={formStyles.field}
          id="password"
          onChange={handleChange}
          type="password"
          value={state.password}
        />
      </div>

      <div className={classNames(formStyles.formRow, state.password ? '' : 'hidden')}>
        <button type="submit" className={styles.dangerButton}>
          {buttonText}
        </button>
      </div>
    </form>
  )
}

export { DeactivateForm }
