import React from 'react';
import Avatar from '../avatar';

import Card from '../card';
import FauxLink from '../fauxLink';
import Link from '../link';

export default function SeriesCard({ series }) {
	const uniqueSpeakers = series.speakers.filter(
		(speaker, index, self) =>
			index === self.findIndex((current) => current.id === speaker.id)
	);

	return (
		<Card>
			<div className="flex-grow">
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

			<div className="flex -space-x-4">
				{uniqueSpeakers.map((speaker) => (
					<Link
						className="relative z-20 transition transform hover:scale-110 hover:z-30"
						to={speaker.fields.slug}
						title={speaker.data.title}
					>
						<Avatar
							className="block w-12 h-12 rounded-full ring-white ring-2"
							image={speaker.data.avatar}
						/>
					</Link>
				))}
			</div>

			<FauxLink to={series.slug}>{`Series on ${series.title}`}</FauxLink>
		</Card>
	);
}
