// todo: this could probably use a basic email form with resetPassword as the onSubmit
import React from 'react'

import { useAuth } from 'context/auth'

import { LoginForm } from 'components/forms/login'
import { Link } from 'components/link'
import { Page } from 'components/page'
import { SEO } from 'components/seo'
import { Section } from 'components/section'

function ResetPassword({ location }) {
	const { resetPassword } = useAuth()

	return (
		<>
			<SEO title="Password Reset" location={location} />
			<Section>
				<Section.Sidebar>
					<Page.Title>Reset your password</Page.Title>
					<div className="mt-2 prose">
						<p>
							Enter your email and we'll send you a link to reset your password.
						</p>
						<p>
							Or <Link to="/login">sign in to your account &rarr;</Link>
						</p>
					</div>
				</Section.Sidebar>

				<Section.Content>
					<div>
						<LoginForm
							context={location}
							onSubmit={resetPassword}
							buttonText="Reset your password"
						/>
					</div>
				</Section.Content>
			</Section>
		</>
	)
}

export default ResetPassword
