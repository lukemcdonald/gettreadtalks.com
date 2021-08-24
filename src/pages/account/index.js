import React from 'react'
import { navigate } from 'gatsby'
import Gravatar from 'react-gravatar'

import { Page } from 'components/page'
import { Section } from 'components/section'
import { SEO } from 'components/seo'
import { Card } from 'components/card'

import { useAuth } from 'context/auth'
import { AccountMenu } from 'components/menus/account'

function AccountPage({ location }) {
	const { isUser, profile } = useAuth()

	if (!isUser) {
		navigate('/login')
		return null
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

					<div className="mt-6">
						<Card display="none" hoverStyles="none">
							{profile?.email && (
								<Gravatar
									email={profile.email}
									className="w-16 h-16 mr-4 rounded-full"
									default="mp"
								/>
							)}

							<div>
								<Card.Title>
									{profile?.displayName || profile.email.split('@')[0]}
								</Card.Title>
								<Card.Meta>{profile.email}</Card.Meta>
							</div>
						</Card>
					</div>

					<hr className="my-6 border-t border-gray-200" />
				</Section.Content>
			</Section>
		</>
	)
}

export default AccountPage
