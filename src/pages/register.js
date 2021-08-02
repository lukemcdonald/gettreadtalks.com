import React from 'react'
import { AuthProvider, useAuth } from '../context/auth'

import { Section } from '../components/section'
import { Page } from '../components/page'
import { LoginForm } from '../components/forms/login'

function Register() {
	const { register } = useAuth()
	return <LoginForm onSubmit={register} buttonText="Register" />
}

function RegisterPage() {
	return (
		<Section>
			<Section.Content>
				<div className="prose">
					<Page.Title>Register</Page.Title>
					<AuthProvider>
						<Register />
					</AuthProvider>
				</div>
			</Section.Content>
		</Section>
	)
}

export default RegisterPage
