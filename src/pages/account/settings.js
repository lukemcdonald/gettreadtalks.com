// Firebase user profile:
// @link https://firebase.google.com/docs/auth/web/manage-users#update_a_users_profile
// @link https://firebase.google.com/docs/reference/js/firebase.User
import React from 'react'
import { navigate } from 'gatsby'

import { useAuth } from 'context/auth'

import { Page } from 'components/page'
import { Section } from 'components/section'
import { SEO } from 'components/seo'

import { Toggle, ToggleOn, ToggleOff, ToggleButton } from 'components/toggle'

function AccountPage({ location }) {
	const { isUser } = useAuth()

	if (!isUser) {
		navigate('/login')
	}

	const talk = { id: 'a4378110-f90c-5546-b2b5-78690ae1b1ff' }

	return (
		<>
			<SEO title="Settings" location={location} />

			<Section>
				<Section.Sidebar>
					<Page.Title>Settings Page</Page.Title>

					<div className="mt-2 prose">Sidebar</div>
				</Section.Sidebar>

				<Section.Content>
					<p>Content area</p>
					<Toggle>
						<ToggleButton onChange={() => console.log('onChange fired')}>
							<ToggleOn>Unfavorite</ToggleOn>
							<ToggleOff>Favorite</ToggleOff>
						</ToggleButton>
					</Toggle>
				</Section.Content>
			</Section>
		</>
	)
}

export default AccountPage
