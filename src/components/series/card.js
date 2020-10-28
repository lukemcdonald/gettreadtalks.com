import React from 'react';

import Card from '../card';
import FauxLink from '../fauxLink';

export default function SeriesCard({ series }) {
	return (
		<Card id={series.id}>
			<div>
				<h2>{series.title}</h2>

				{series.publishedTalksCount && (
					<span>
						{series.publishedTalksCount === 1
							? `${series.publishedTalksCount} Talk`
							: `${series.publishedTalksCount} Talks`}
					</span>
				)}
			</div>

			<FauxLink to={series.slug}>{`Series on ${series.title}`}</FauxLink>
		</Card>
	);
}
