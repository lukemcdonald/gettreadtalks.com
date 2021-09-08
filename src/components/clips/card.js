import React from 'react'
import { Card } from 'components/card'

function ClipCard({ clip }) {
	return (
		<Card
			to={clip.slug}
			avatar={clip?.speakers?.[0].data?.avatar || null}
			title={clip.title}
			text={clip.speaker}
		/>
	)
}

export { ClipCard }
