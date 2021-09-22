// todo: this could probably use a basic email form with resetPassword as the onSubmit
import React from 'react'

import { useAuth } from 'context/auth'

import { LoginForm } from 'components/account/login-form'
import { Link } from 'components/link'
import { Page } from 'components/page'
import { SEO } from 'components/seo'
import { Section } from 'components/section'

import formStyles from 'components/styles/form'

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
					<div className="relative z-10 flex items-center justify-center flex-auto">
						<div className="w-full max-w-md">
							<LoginForm
								className={formStyles.fieldset}
								onSubmit={resetPassword}
								buttonText="Reset your password"
								hiddenFields={['password']}
							/>
						</div>
					</div>
				</Section.Content>
			</Section>
		</>
	)
}

export default ResetPassword
