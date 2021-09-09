import React, { useEffect, useState } from 'react'
import { Card } from 'components/card'
import { useUsers } from 'context/users'

function TalkCard({ talk }) {
	const { user } = useUsers()
	let icons = talk?.favorite ? ['featured'] : []

	if (user && user?.favoriteTalks && user.favoriteTalks.includes(talk.id)) {
		icons = ['favorite', ...icons]
	}

	// const [icons, setIcons] = useState(() => (talk?.favorite ? ['featured'] : []))
	// useEffect(() => {
	// 	if (user && user?.favoriteTalks && user.favoriteTalks.includes(talk.id)) {
	// 		setIcons((icons) => ['favorite', ...icons])
	// 	}
	// }, [talk, user])

	return (
		<Card
			to={talk.slug}
			image={talk?.speakers?.[0].data?.avatar || null}
			subtitle={talk?.subtitle || null}
			title={talk.title}
			text={talk.speaker}
			icons={icons}
		/>
	)
}

export { TalkCard }
