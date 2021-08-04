import React from 'react'
import { useAuth } from '../context/auth'

import { Link } from '../components/link'
import { Section } from '../components/section'
import { SEO } from '../components/seo'
import { Page } from '../components/page'
import { LoginForm } from '../components/forms/login'

function RegisterPage({ location }) {
	const { register } = useAuth()

	return (
		<>
			<SEO title="Register" location={location} />

			<Section>
				<Section.Sidebar>
					<Page.Title>Register your account</Page.Title>

					<div className="mt-2 prose">
						<p>
							Or <Link to="/login">sign in to your account &rarr;</Link>
						</p>
					</div>
				</Section.Sidebar>

				<Section.Content>
					<div className="relative z-10 flex items-center justify-center flex-auto">
						<div className="w-full max-w-md">
							<LoginForm
								onSubmit={register}
								buttonText="Register your account"
							/>
						</div>
					</div>
				</Section.Content>
			</Section>
		</>
	)
}

export default RegisterPage
