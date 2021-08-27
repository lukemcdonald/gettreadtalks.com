// todo: Setup Firebase functionality to handle email and password updates onClick event handlers.

import React from 'react'
import { navigate } from 'gatsby'

import { Page } from 'components/page'
import { Section } from 'components/section'
import { SEO } from 'components/seo'

import { useAuth } from 'context/auth'
import { AccountMenu } from 'components/menus/account'
import { DeactivateAccountButton } from 'components/account/deactivate-button'
import { UpdateEmailForm } from 'components/forms/update-email'
import { UpdatePasswordForm } from 'components/forms/update-password'

import formStyles from 'components/styles/form'

function AccountPage({ location }) {
	const { isUser } = useAuth()

	if (!isUser) {
		navigate('/login')
		return null
	}

	return (
		<>
			<SEO title="Your Account" location={location} />

			<Section>
				<Section.Sidebar className="space-y-6">
					<AccountMenu />
				</Section.Sidebar>

				<Section.Content>
					<Page.Title>Account Settings</Page.Title>
					<p className="mt-2">
						Manage the email address and password associated with your account.
					</p>

					<div className="mt-6 space-y-6">
						<div className={formStyles.boxed}>
							<UpdateEmailForm />
						</div>
						<div className={formStyles.boxed}>
							<UpdatePasswordForm />
						</div>
						<div className="mt-6">
							<DeactivateAccountButton
								className="bg-red-600"
								buttonText="Deactivate Account"
							/>
						</div>
					</div>
				</Section.Content>
			</Section>
		</>
	)
}

export default AccountPage
