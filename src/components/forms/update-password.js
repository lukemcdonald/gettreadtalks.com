import React, { useState } from 'react'
import classNames from 'classnames'
import { FormErrorMessage } from 'components/forms/lib/error-message'
import { useAsync } from 'hooks/async'

import styles from 'components/styles'
import formStyles from 'components/styles/form'

function UpdatePasswordForm({ className, buttonText, onSubmit }) {
	const { error: asyncError, run } = useAsync()
	const [error, setError] = useAsync(asyncError)
	const [state, setState] = useState({
		password: '',
		password2: '',
	})

	function handleSubmit(event) {
		event.preventDefault()
		const { password, password2 } = state

		if (password2 !== password) {
			setError('Passwords do not match')
			return null
		}

		run(onSubmit({ password, password2 }))
	}

	function handleChange(event) {
		setState({ ...state, [event.target.id]: event.target.value })
	}

	return (
		<form onSubmit={handleSubmit} className={className}>
			{error && <FormErrorMessage error={error} />}

			<div className={formStyles.formRow}>
				<label htmlFor="password" className={formStyles.label}>
					Password
				</label>
				<input
					id="password"
					autoComplete="password"
					type="text"
					onChange={handleChange}
					value={state.password}
					className={formStyles.input}
				/>
			</div>

			<div className={formStyles.formRow}>
				<label htmlFor="password2" className={formStyles.label}>
					Verify Password
				</label>
				<input
					id="password2"
					autoComplete="password2"
					type="text"
					onChange={handleChange}
					value={state.password2}
					className={formStyles.input}
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

export { UpdatePasswordForm }
