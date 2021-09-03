import React, { useState } from 'react'
import classNames from 'classnames'

import { useAsync } from 'hooks/async'
import { FormErrorMessage } from 'components/account/lib/error-message'

import styles from 'components/styles'
import formStyles from 'components/styles/form'

function DeactivateForm({ className, buttonText, onSubmit }) {
	const { isError, error, run } = useAsync()
	const [state, setState] = useState({
		password: '',
	})

	function handleSubmit(event) {
		event.preventDefault()
		const { password } = state
		run(onSubmit({ password }))
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
					className={formStyles.field}
					initialfocus="true"
				/>
			</div>

			<div
				className={classNames(formStyles.formRow, !state.password && 'hidden')}
			>
				<button type="submit" className={styles.dangerButton}>
					{buttonText || 'Submit'}
				</button>
			</div>
		</form>
	)
}

export { DeactivateForm }
