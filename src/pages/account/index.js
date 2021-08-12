import React from 'react'
import { navigate } from 'gatsby'

import { useAuth } from 'context/auth'
import { Page } from 'components/page'
import { Section } from 'components/section'
import { SEO } from 'components/seo'

import { useUsers } from 'context/users'
import { useAsync } from 'hooks/useAsync'
import { useFavoriteTalk } from 'hooks/useFavoriteTalk'
import styles from 'components/styles'

function AccountPage({ location }) {
	const { user } = useAuth()
	const { run } = useAsync()
	const { addFavorite, removeFavorite, updateFavorite } = useFavoriteTalk()
	const {
		deleteUserById,
		readUserById,
		readAllUsers,
		setUser,
		updateUser,
		profile,
	} = useUsers()

	if (!user) {
		navigate('/login')
	}

	return (
		<>
			<SEO title="Your Account" location={location} />

			<Section>
				<Section.Sidebar>
					<Page.Title>Your Account</Page.Title>

					<div className="flex flex-col gap-4 mt-4">
						<button
							className={styles.button}
							type="button"
							onClick={() =>
								addFavorite({
									id: '0502e2f8-feb2-5dd9-8fc2-5482a26b38fa',
								})
							}
						>
							Add 0502e2f8
						</button>

						<button
							className={styles.button}
							type="button"
							onClick={() =>
								addFavorite({
									id: 'a4378110-f90c-5546-b2b5-78690ae1b1ff',
								})
							}
						>
							Add a4378110
						</button>

						<button
							className={styles.button}
							type="button"
							onClick={() =>
								removeFavorite({
									id: 'a4378110-f90c-5546-b2b5-78690ae1b1ff',
								})
							}
						>
							Remove a4378110
						</button>

						<button
							className={styles.button}
							type="button"
							onClick={() =>
								updateFavorite({
									id: 'a4378110-f90c-5546-b2b5-78690ae1b1ff',
								})
							}
						>
							Toggle a4378110
						</button>

						<hr />

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
							onClick={() => setUser(user.uid, {}, { merge: false })}
						>
							Reset user
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
							onClick={() => run(readUserById(user.uid))}
						>
							Read user by ID
						</button>

						<button
							className={styles.button}
							type="button"
							onClick={() =>
								setUser(
									user.uid,
									{
										updatedTime: new Date(),
										favoriteTalks: [
											'6cac2356-23a9-5f80-8283-02d201e371e5',
											'5c2c77dd-1bca-557e-a14a-c5f2273a5a1d',
											'932efc94-bacd-5ea9-a494-5b80120bb279',
										],
									},
									{ merge: false }
								)
							}
						>
							Add default data
						</button>

						<button
							className={styles.button}
							type="button"
							onClick={() => deleteUserById(user.uid)}
						>
							Delete user by ID
						</button>
					</div>
				</Section.Sidebar>

				<Section.Content>
					<h2 className="text-xl font-bold">Profile Data</h2>
					{console.log('Account', profile)}
					{profile && (
						<pre className="mt-6">
							<ul className="prose">
								{Object.keys(profile).map((key) => (
									<li key={key}>
										<strong>{key}:</strong>
										{key === 'favoriteTalks' && profile[key] && (
											<ol>
												{profile[key].map(
													(data, index) =>
														data && (
															<li key={`favoriteTalk-${index}`}>
																{data.toString()}
															</li>
														)
												)}
											</ol>
										)}

										{key !== 'favoriteTalks' && profile[key].toString()}
									</li>
								))}
							</ul>
						</pre>
					)}
				</Section.Content>
			</Section>
		</>
	)
}

export default AccountPage
