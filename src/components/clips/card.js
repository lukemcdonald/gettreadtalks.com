import React from 'react'

import { Card } from 'components/card'
import { FauxLink } from 'components/fauxLink'

function ClipCard({ clip }) {
	return (
		<Card className="rounded">
			{clip.speakers.map(
				(speaker) =>
					speaker.data?.avatar && (
						<Card.Avatar
							key={speaker.id}
							image={speaker.data?.avatar}
							alt={speaker.data?.title}
						/>
					)
			)}

			<div>
				<Card.Title as="h2">{clip.title}</Card.Title>

				<Card.Meta>
					{clip.speakers.map(({ id, data, fields }) => (
						<span key={id}>
							<span>By</span>&nbsp;
							<Card.MetaLink to={fields.slug}>{data.title}</Card.MetaLink>
							&nbsp;
						</span>
					))}
				</Card.Meta>
			</div>

			<FauxLink to={clip.slug}>{`Listen to ${clip.title}`}</FauxLink>
		</Card>
	)
}

export { ClipCard }
