import React from 'react';

import Card from '../card';
import FauxLink from '../fauxLink';

export default function TopicCard({ topic }) {
	return (
		<Card id={topic.id}>
			<div>
				<h2>{topic.title}</h2>
				{topic.publishedTalksCount && (
					<span>
						{topic.publishedTalksCount === 1
							? `${topic.publishedTalksCount} Talk`
							: `${topic.publishedTalksCount} Talks`}
					</span>
				)}
			</div>

			<FauxLink to={topic.slug}>{`Talks on ${topic.title}`}</FauxLink>
		</Card>
	);
}
