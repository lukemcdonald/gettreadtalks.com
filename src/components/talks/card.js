import React, { useEffect, useState } from 'react'
import { Card } from 'components/card'
import { useUsers } from 'context/users'

function TalkCard({ talk }) {
	const { user } = useUsers()
	let icons = talk?.favorite ? ['featured'] : []

	if (user && user?.finishedTalks && user.finishedTalks.includes(talk.id)) {
		icons = ['finished', ...icons]
	}

	if (user && user?.favoriteTalks && user.favoriteTalks.includes(talk.id)) {
		icons = ['favorite', ...icons]
	}

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
