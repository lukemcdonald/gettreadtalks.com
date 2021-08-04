import React from 'react'
import { useAuth } from '../context/auth'

import { Link } from '../components/link'
import { LoginForm } from '../components/forms/login'
import { Page } from '../components/page'
import { Section } from '../components/section'
import { SEO } from '../components/seo'

function RegisterPage({ location }) {
	const { login } = useAuth()

	return (
		<>
			<SEO title="Sign in" location={location} />

			<Section>
				<Section.Sidebar>
					<Page.Title>Sign in to your account</Page.Title>

					<div className="mt-2 prose">
						<p>
							Or <Link to="/register">register for a free account &rarr;</Link>
						</p>
					</div>
				</Section.Sidebar>

				<Section.Content>
					<div className="relative z-10 flex items-center justify-center flex-auto">
						<div className="w-full max-w-md">
							<LoginForm onSubmit={login} buttonText="Sign in to account" />

							<div className="mt-6 prose text-center">
								<p>
									<Link
										to="/password/reset"
										className="text-sm underline hover:text-gray-900"
									>
										Forgot password?
									</Link>
								</p>
							</div>
						</div>
					</div>
				</Section.Content>
			</Section>
		</>
	)
}

export default RegisterPage
