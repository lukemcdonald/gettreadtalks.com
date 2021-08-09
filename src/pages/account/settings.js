// Firebase user profile:
// @link https://firebase.google.com/docs/auth/web/manage-users#update_a_users_profile
// @link https://firebase.google.com/docs/reference/js/firebase.User
import React from 'react'
import { navigate } from 'gatsby'

import { useAuth } from 'context/auth'

import { Page } from 'components/page'
import { Section } from 'components/section'
import { SEO } from 'components/seo'

function AccountPage({ location }) {
	const { user } = useAuth()

	if (!user) {
		navigate('/login')
	}

	return (
		<>
			<SEO title="Settings" location={location} />

			<Section>
				<Section.Sidebar>
					<Page.Title>Settings</Page.Title>

					<div className="mt-2 prose">Sidebar</div>
				</Section.Sidebar>

				<Section.Content>
					<p>Contnet area</p>
				</Section.Content>
			</Section>
		</>
	)
}

export default AccountPage
