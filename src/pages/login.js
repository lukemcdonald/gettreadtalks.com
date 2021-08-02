import React from 'react'
import { AuthProvider, useAuth } from '../context/auth'

import { Link } from '../components/link'
import { Section } from '../components/section'
import { Page } from '../components/page'
import { LoginForm } from '../components/forms/login'

function Login() {
	const { login, user } = useAuth()
	return (
		<>
			<LoginForm onSubmit={login} buttonText="Login" />
			{!user && (
				<p>
					Don't have an account? <Link to="/register">Register here!</Link>
				</p>
			)}
		</>
	)
}

function RegisterPage() {
	return (
		<Section>
			<Section.Content>
				<div className="prose">
					<Page.Title>Login</Page.Title>
					<AuthProvider>
						<Login />
					</AuthProvider>
				</div>
			</Section.Content>
		</Section>
	)
}

export default RegisterPage
