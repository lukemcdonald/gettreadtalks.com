import React, { useState } from 'react'
import classNames from 'classnames'

import { useAsync } from 'hooks/async'
import { FormErrorMessage } from 'components/forms/lib/error-message'

import styles from 'components/styles'
import formStyles from 'components/styles/form'

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

			<div className={classNames(formStyles.formRow)}>
				<label htmlFor="password" className={formStyles.label}>
					Password
				</label>
				<input
					id="password"
					autoComplete="password"
					type="password"
					onChange={handleChange}
					value={state.password}
					className={formStyles.input}
					initialfocus="true"
				/>
			</div>

			<div className={formStyles.formRow}>
				<button
					type="submit"
					className={classNames(
						styles.button,
						state.password
							? 'bg-red-600'
							: 'bg-opacity-80 pointer-events-none cursor-not-allowed'
					)}
				>
					{buttonText}
				</button>
			</div>
		</form>
	)
}

export { DeactivateAccountForm }
