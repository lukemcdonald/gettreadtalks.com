import React from 'react';

import Card from '../card';
import FauxLink from '../fauxLink';

export default function SeriesCard({ series }) {
	return (
		<Card className="rounded">
			<div>
				<Card.Title as="h2">{series.title}</Card.Title>

				{series.publishedTalksCount && (
					<Card.Meta>
						<span>
							{series.publishedTalksCount === 1
								? `${series.publishedTalksCount} Talk`
								: `${series.publishedTalksCount} Talks`}
						</span>
					</Card.Meta>
				)}
			</div>

			<FauxLink to={series.slug}>{`Series on ${series.title}`}</FauxLink>
		</Card>
	);
}
