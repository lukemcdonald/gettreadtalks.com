import React, { useEffect, useState } from 'react'
import { navigate } from 'gatsby'

import { useAuth } from 'context/auth'
import { Page } from 'components/page'
import { Section } from 'components/section'
import { SEO } from 'components/seo'

import { useUsers } from 'hooks/useUsers'
import styles from 'components/styles'

function AccountPage({ location }) {
	const { user } = useAuth()
	const [userData, setUserData] = useState(null)

	const { deleteUserById, readUserById, readAllUsers, setUser, updateUser } =
		useUsers()

	useEffect(() => {
		if (user) {
			const {
				uid,
				email,
				metadata: { creationTime, lastSignInTime },
			} = user
			setUserData({
				uid,
				email,
				creationTime,
				lastSignInTime,
			})
		}
	}, [user])

	if (!user) {
		navigate('/login')
	}

	return (
		<>
			<SEO title="Your Account" location={location} />

			<Section>
				<Section.Sidebar>
					<Page.Title>Your Account</Page.Title>

					<div className="mt-2 prose">Sidebar</div>
				</Section.Sidebar>

				<Section.Content>
					<div className="space-x-4 space-y-4">
						<button
							className={styles.button}
							type="button"
							onClick={() => setUser(user)}
						>
							Set user
						</button>

						<button
							className={styles.button}
							type="button"
							onClick={() =>
								updateUser(user.uid, {
									name: 'Luke McDonald',
									age: 39,
								})
							}
						>
							Update user
						</button>

						<button
							className={styles.button}
							type="button"
							onClick={() => readAllUsers()}
						>
							Read all users
						</button>

						<button
							className={styles.button}
							type="button"
							onClick={() => readUserById(user.uid)}
						>
							Read user by ID
						</button>

						<button
							className={styles.button}
							type="button"
							onClick={() => deleteUserById(user.uid)}
						>
							Delete user by ID
						</button>
					</div>

					{userData && (
						<ul>
							{Object.keys(userData).map((key) => (
								<li key={key}>
									<strong>{key}:</strong> {userData[key]}
								</li>
							))}
						</ul>
					)}
				</Section.Content>
			</Section>
		</>
	)
}

export default AccountPage
