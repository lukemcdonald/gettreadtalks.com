import React, { useState } from 'react'
import classNames from 'classnames'

import { useAsync } from 'hooks/useAsync'
import { FormErrorMessage } from 'components/forms/lib/errorMessage'
import styles from 'components/forms/styles'

function DeactivateAccountForm({ className, buttonText, onSubmit }) {
	const { isError, error } = useAsync()
	const [state, setState] = useState({
		password: '',
	})

	function handleSubmit(event) {
		event.preventDefault()
		const { password } = state
		onSubmit({ password })
	}

	function handleChange(event) {
		setState({ ...state, [event.target.id]: event.target.value })
	}

	return (
		<form onSubmit={handleSubmit} className={className}>
			{isError && <FormErrorMessage error={error} />}

			<div className={classNames(styles.formRow)}>
				<label htmlFor="password" className={styles.label}>
					Password
				</label>
				<input
					id="password"
					autoComplete="password"
					type="password"
					onChange={handleChange}
					value={state.password}
					className={styles.input}
				/>
			</div>

			<div className={styles.formRow}>
				<button type="submit" className={styles.button}>
					{buttonText}
				</button>
			</div>
		</form>
	)
}

export { DeactivateAccountForm }
