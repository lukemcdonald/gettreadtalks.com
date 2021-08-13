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
	const { updateUser, user } = useUsers()
	const [favoriteTalks, setFavoriteTalks] = React.useState([])

	React.useEffect(() => {
		if (!user) {
			return
		}

		setFavoriteTalks(user.favoriteTalks)
	}, [user])

	const isFavorite = (talk) =>
		favoriteTalks && favoriteTalks.some((id) => id === talk.id)

	function addFavorite(talk) {
		if (isFavorite(talk)) {
			return
		}

		run(
			updateUser(user.id, {
				favoriteTalks: [talk.id, ...(favoriteTalks || [])],
			})
		)
	}

	function removeFavorite(talk) {
		if (!isFavorite(talk)) {
			return
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

export { useFavoriteTalk }
