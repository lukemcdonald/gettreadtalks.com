import React from 'react'
import { useAuth } from '../context/auth'

import { Link } from '../components/link'
import { Section } from '../components/section'
import { Page } from '../components/page'
import { LoginForm } from '../components/forms/login'

function RegisterPage() {
	const { login, user } = useAuth()

	return (
		<Section>
			<Section.Content>
				<div className="prose">
					<Page.Title>Login</Page.Title>
					<LoginForm onSubmit={login} buttonText="Login" />
					{!user && (
						<p>
							Don't have an account? <Link to="/register">Register here!</Link>
						</p>
					)}
				</div>
			</Section.Content>
		</Section>
	)
}

export default RegisterPage
