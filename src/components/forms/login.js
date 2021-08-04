import React, { useState } from 'react'
import classNames from 'classnames'
import { ExclamationCircleIcon } from '@heroicons/react/solid'
import { useAsync } from 'utils/async'

import styles from 'components/forms/styles'

function LoginForm({ className, buttonText, onSubmit, context = {} }) {
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
		<form
			onSubmit={handleSubmit}
			className={classNames('p-10 bg-white rounded shadow-sm', className)}
		>
			{isError && (
				<div className={classNames(styles.error, 'flex items-center')}>
					<ExclamationCircleIcon className="w-10 h-10 mr-2" />
					<p>{error.message}</p>
				</div>
			)}

			<div className={styles.formRow}>
				<label htmlFor="email" className={styles.label}>
					Email address
				</label>
				<input
					id="email"
					autoComplete="email"
					type="text"
					onChange={handleChange}
					value={state.email}
					className={styles.input}
				/>
			</div>

			<div
				className={classNames(
					styles.formRow,
					context.pathname === '/password/reset' ? 'hidden' : ''
				)}
			>
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

export { LoginForm }
