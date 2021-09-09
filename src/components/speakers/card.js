import React, { useEffect, useState } from 'react'
import { useUsers } from 'context/users'
import { Card } from 'components/card'

function SpeakerCard({ speaker }) {
	const { user } = useUsers()
	const [icons, setIcons] = useState(() =>
		speaker?.favorite ? [{ type: 'featured', to: '/speakers/featured/' }] : []
	)

	useEffect(() => {
		if (
			user &&
			user?.favoriteSpeakers &&
			user.favoriteSpeakers.includes(speaker.id)
		) {
			setIcons((icons) => [
				{ type: 'favorite', to: '/account/favorites/' },
				...icons,
			])
		}
	}, [speaker, user])

	return (
		<Card
			to={speaker.slug}
			image={speaker?.avatar || null}
			title={speaker.title}
			text={speaker?.role}
			icons={icons}
		/>
	)
}

export { SpeakerCard }
