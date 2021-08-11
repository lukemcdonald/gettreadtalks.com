import React from 'react'
import { graphql } from 'gatsby'
import { useAsync } from 'hooks/useAsync'
import { useAuth } from 'context/auth'
import { useUsers } from 'context/users'

const userFavoriteTalksQuery = graphql`
	query {
		allAirtableTalk {
			nodes {
				data {
					title
				}
			}
		}
	}
`

function useUsersFavoriteTalks() {
	const { run } = useAsync()
	const { user } = useAuth()
	const { updateUser, profile } = useUsers()
	const [favoriteTalks, setFavoriteTalks] = React.useState([])

	React.useEffect(() => {
		if (profile) {
			setFavoriteTalks(profile.favoriteTalks)
		}
	}, [profile])

	const isFavoriteTalk = (talk) =>
		favoriteTalks && favoriteTalks.some((id) => id === talk.id)

	function addFavoriteTalk(talk) {
		if (isFavoriteTalk(talk)) {
			return
		}

		run(
			updateUser(user.uid, {
				favoriteTalks: [talk.id, ...(favoriteTalks || [])],
			})
		)
	}

	function removeFavoriteTalk(talk) {
		if (!isFavoriteTalk(talk)) {
			return
		}

		run(
			updateUser(user.uid, {
				favoriteTalks: favoriteTalks.filter((id) => id !== talk.id),
			})
		)
	}

	function toggleFavoriteTalk(talk) {
		return isFavoriteTalk(talk)
			? removeFavoriteTalk(talk)
			: addFavoriteTalk(talk)
	}

	return {
		addFavoriteTalk,
		removeFavoriteTalk,
		toggleFavoriteTalk,
		isFavoriteTalk,
	}
}

export { useUsersFavoriteTalks }
