import React from 'react'

import Card from '../card'
import FauxLink from '../fauxLink'

function TopicCard({ topic }) {
	return (
		<Card className="flex rounded">
			<div>
				{topic.title && <Card.Title as="h2">{topic.title}</Card.Title>}

				<Card.Meta>
					{topic.publishedTalksCount && (
						<span>
							{topic.publishedTalksCount === 1
								? `${topic.publishedTalksCount} Talk`
								: `${topic.publishedTalksCount} Talks`}
						</span>
					)}
				</Card.Meta>
			</div>

			<FauxLink to={topic.slug}>{`Talks on ${topic.title}`}</FauxLink>
		</Card>
	)
}

export default TopicCard
