import React from 'react'
import { Card } from 'components/card'
import { useFavoriteTalk } from 'hooks/favorite-talk'
import { useFinishedTalk } from 'hooks/finished-talk'

function TalkCard({ talk }) {
	const { isFavorite } = useFavoriteTalk()
	const { isFinished } = useFinishedTalk()
	let icons = talk?.favorite ? ['featured'] : []

	if (isFavorite(talk)) {
		icons = ['favorite', ...icons]
	}

	if (isFinished(talk)) {
		icons = ['finished', ...icons]
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
