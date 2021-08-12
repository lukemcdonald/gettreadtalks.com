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

function useFavoriteTalk() {
	const { run } = useAsync()
	const { user } = useAuth()
	const { updateUser, profile } = useUsers()
	const [favoriteTalks, setFavoriteTalks] = React.useState([])

	React.useEffect(() => {
		if (!profile) {
			return null
		}

		setFavoriteTalks(profile.favoriteTalks)
	}, [profile])

	const isFavorite = (talk) =>
		favoriteTalks && favoriteTalks.some((id) => id === talk.id)

	function addFavorite(talk) {
		if (isFavorite(talk)) {
			return
		}

		run(
			updateUser(user.uid, {
				favoriteTalks: [talk.id, ...(favoriteTalks || [])],
			})
		)
	}

	function removeFavorite(talk) {
		if (!isFavorite(talk)) {
			return
		}

		run(
			updateUser(user.uid, {
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

export { useFavoriteTalk }
