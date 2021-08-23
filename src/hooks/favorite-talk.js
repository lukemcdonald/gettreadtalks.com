import React from 'react'
import { useAsync } from 'hooks/async'
import { useUsers } from 'context/users'
import styles from 'components/styles'
import { DeactivateAccountButton } from 'components/account/deactivate-button'

function useFavoriteTalk() {
	const { run } = useAsync()
	const { updateUser, user } = useUsers()
	const [favoriteTalks, setFavoriteTalks] = React.useState([])

	React.useEffect(() => {
		if (!user) {
			return null
		}

		setFavoriteTalks(user.favoriteTalks)
	}, [user])

	const isFavorite = (talk) =>
		favoriteTalks && favoriteTalks.some((id) => id === talk.id)

	function addFavorite(talk) {
		if (isFavorite(talk)) {
			return null
		}

		run(
			updateUser(user.id, {
				favoriteTalks: [talk.id, ...(favoriteTalks || [])],
			})
		)
	}

	function removeFavorite(talk) {
		if (!isFavorite(talk)) {
			return null
		}

		run(
			updateUser(user.id, {
				favoriteTalks: favoriteTalks.filter((id) => id !== talk.id),
			})
		)
	}

	function updateFavorite(talk) {
		return isFavorite(talk) ? removeFavorite(talk) : addFavorite(talk)
	}

	return {
		addFavorite,
		removeFavorite,
		updateFavorite,
		isFavorite,
	}
}

function FavoriteTalksTestControls() {
	const { run } = useAsync()
	const { updateUser, setUser, readUserById, user } = useUsers()
	const { addFavorite, removeFavorite, updateFavorite } = useFavoriteTalk()

	return (
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
					run(
						updateUser(user.id, {
							name: 'Luke McDonald',
							age: 39,
						})
					)
				}
			>
				Update user
			</button>

			<button
				className={styles.button}
				type="button"
				onClick={() =>
					run(setUser(user.id, { favoriteTalks: [] }, { merge: false }))
				}
			>
				Reset user
			</button>

			<button
				className={styles.button}
				type="button"
				onClick={() => run(readUserById(user.id))}
			>
				Read user by ID
			</button>

			<button
				className={styles.button}
				type="button"
				onClick={() =>
					run(
						setUser(
							user.id,
							{
								updatedTime: new Date(),
								favoriteTalks: [
									'6cac2356-23a9-5f80-8283-02d201e371e5',
									'5c2c77dd-1bca-557e-a14a-c5f2273a5a1d',
									'932efc94-bacd-5ea9-a494-5b80120bb279',
									'434a4cdb-ef50-5ba1-bfbe-1f098fe2d259',
									'09cbb694-c494-57c4-af08-f185d30c238b',
									'397e8946-8d5b-5d06-9129-4e903736ae18',
									'a8a213f6-3b3d-53d8-9b2e-77cb1ca33c67',
									'46f048a1-5a75-5240-897a-c23e0dd28475',
								],
							},
							{ merge: false }
						)
					)
				}
			>
				Add default data
			</button>

			<DeactivateAccountButton id={user?.id} />
		</div>
	)
}

export { useFavoriteTalk, FavoriteTalksTestControls }
