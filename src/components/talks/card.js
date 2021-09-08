import React, { useEffect, useState } from 'react'
import { Card } from 'components/card'
import { useUsers } from 'context/users'

function TalkCard({ talk }) {
	const { user } = useUsers()
	const [icons, setIcons] = useState(() =>
		talk?.favorite ? [{ type: 'featured', to: '/talks/featured/' }] : []
	)

	useEffect(() => {
		if (user && user?.favoriteTalks && user.favoriteTalks.includes(talk.id)) {
			setIcons((icons) => [
				{ type: 'favorite', to: '/account/favorites/' },
				...icons,
			])
		}
	}, [talk.id, user])

	return (
		<Card
			to={talk.slug}
			avatar={talk?.speakers?.[0].data?.avatar || null}
			subtitle={talk?.subtitle || null}
			title={talk.title}
			text={talk.speaker}
			icons={icons}
		/>
	)
}

export { TalkCard }
