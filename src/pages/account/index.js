import React from 'react'
import { navigate } from 'gatsby'

import { Page } from 'components/page'
import { Section } from 'components/section'
import { SEO } from 'components/seo'

import { useAuth } from 'context/auth'
import { AccountMenu } from 'components/menus/account'

function AccountPage({ location }) {
	const { isUser } = useAuth()

	if (!isUser) {
		navigate('/login')
	}

	return (
		<>
			<SEO title="Your Account" location={location} />

			<Section>
				<Section.Sidebar>
					<AccountMenu />
				</Section.Sidebar>

				<Section.Content>
					<Page.Title>Your Account</Page.Title>
					<p>
						Display user account information, password reset, and account
						deactivation buttons.
					</p>
				</Section.Content>
			</Section>
		</>
	)
}

export default AccountPage
