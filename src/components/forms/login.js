import React, { useState } from 'react'
import classNames from 'classnames'
import { useAsync } from '../../utils/async'
import formStyles from './index'

function LoginForm({ className, onSubmit, buttonText }) {
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
			{isError && <div className={formStyles.error}>{error.message}</div>}

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
					required
				/>
			</div>

			<div className={formStyles.formRow}>
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
					required
				/>
			</div>

			<div className={formStyles.formRow}>
				<button type="submit" className={formStyles.button}>
					{buttonText}
				</button>
			</div>
		</form>
	)
}

export { LoginForm }
