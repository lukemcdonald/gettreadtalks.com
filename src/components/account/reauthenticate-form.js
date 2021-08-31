import React, { useState } from 'react'
import classNames from 'classnames'

import { useAsync } from 'hooks/async'
import { FormErrorMessage } from 'components/account/lib/error-message'

import styles from 'components/styles'
import formStyles from 'components/styles/form'
import { useAuth } from 'context/auth'

function ReauthenticateForm({ className, buttonText, onSubmit }) {
	const { isError, error, run } = useAsync()
	const { profile, reauthenticate } = useAuth()
	const [state, setState] = useState({
		password: '',
	})

	async function handleSubmit(event) {
		event.preventDefault()
		console.log('ReauthenticateForm', event)
		const credentials = await run(
			reauthenticate({ email: profile.email, password: state.password })
		)
		onSubmit(credentials)
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

			<div className={formStyles.formRow}>
				<button type="submit" className={classNames(styles.button)}>
					{buttonText || 'Submit'}
				</button>
			</div>
		</form>
	)
}

export { ReauthenticateForm }
