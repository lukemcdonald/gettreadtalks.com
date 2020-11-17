import React from 'react';

import Card from '../card';
import FauxLink from '../fauxLink';

export default function TopicCard({ topic }) {
	return (
		<Card id={topic.id} className="flex">
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
	);
}
