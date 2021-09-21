import React from 'react'
import { Card } from 'components/card'

function ClipCard({ clip }) {
	return (
		<Card
			to={clip.slug}
			image={clip?.speakers?.[0].data.avatar || null}
			title={clip.title}
			text={clip?.speakers?.[0].data.title || null}
		/>
	)
}

export { ClipCard }
