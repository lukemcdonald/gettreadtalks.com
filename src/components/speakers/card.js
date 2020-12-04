import React from 'react';
import { maybePluralize } from '../../utilities';

import Card from '../card';
import FauxLink from '../fauxLink';

export default function SpeakerCard({ disable = [], speaker }) {
	disable.map((item) => (speaker[item] = ''));

	return (
		<Card className="rounded">
			{speaker.avatar && (
				<Card.Avatar image={speaker.avatar} title={speaker.title} />
			)}

			<div>
				{speaker.title && <Card.Title as="h2">{speaker.title}</Card.Title>}

				<Card.Meta>
					{speaker.role && <span>{speaker.role}</span>}

					{speaker.role && speaker.ministry && (
						<span className="mx-1">&middot;</span>
					)}

					{speaker.ministry && (
						<span>
							{speaker.website ? (
								<Card.MetaLink to={speaker.website}>
									{speaker.ministry}
								</Card.MetaLink>
							) : (
								<span>{speaker.ministry}</span>
							)}
						</span>
					)}

					{(speaker.role || speaker.ministry) && speaker.talks && (
						<span className="mx-1">&middot;</span>
					)}

					{speaker.talks && maybePluralize(speaker.talks.length, 'Talk')}
				</Card.Meta>

				{speaker?.favorite && <Card.FeaturedLink to="/speakers/featured/" />}
			</div>

			<FauxLink to={speaker.slug}>{`Talks by ${speaker.title}`}</FauxLink>
		</Card>
	);
}
