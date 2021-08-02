import React, { useState } from 'react'
import { useAsync } from '../../utils/async'

function LoginForm({ onSubmit, buttonText }) {
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
		<form onSubmit={handleSubmit}>
			<div>
				<label htmlFor="email">Email</label>
				<input
					id="email"
					type="text"
					onChange={handleChange}
					value={state.email}
				/>
			</div>
			<div>
				<label htmlFor="password">Password</label>
				<input
					id="password"
					type="password"
					onChange={handleChange}
					value={state.password}
				/>
			</div>
			{isError && <div className="text-status-error">{error.message}</div>}
			<div>
				<button type="submit">{buttonText}</button>
			</div>
		</form>
	)
}

export { LoginForm }
