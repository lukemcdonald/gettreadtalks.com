import React, { useState } from 'react'
import classNames from 'classnames'
import { FormErrorMessage } from 'components/forms/lib/error-message'
import { useAsync } from 'hooks/async'

import styles from 'components/styles'
import formStyles from 'components/styles/form'

function UpdateEmailForm({ className, buttonText, onSubmit }) {
	const { isError, error, run } = useAsync()
	const [state, setState] = useState({
		email: '',
	})

	function handleSubmit(event) {
		event.preventDefault()
		const { email } = state
		run(onSubmit({ email }))
	}

	function handleChange(event) {
		setState({ ...state, [event.target.id]: event.target.value })
	}

	return (
		<form onSubmit={handleSubmit} className={className}>
			{isError && <FormErrorMessage error={error} />}

			<div className={formStyles.formRow}>
				<label htmlFor="email" className={formStyles.label}>
					Email address
				</label>
				<input
					id="email"
					autoComplete="email"
					type="text"
					onChange={handleChange}
					value={state.email}
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

export { UpdateEmailForm }
