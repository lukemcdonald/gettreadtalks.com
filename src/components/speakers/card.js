import React from 'react';

import Card from '../card';
import FauxLink from '../fauxLink';

export default function SpeakerCard({ speaker }) {
	return (
		<Card className="rounded">
			{speaker.avatar && (
				<Card.Avatar image={speaker.avatar} title={speaker.title} />
			)}

			<div>
				{speaker.title && <Card.Title as="h2">{speaker.title}</Card.Title>}

				<Card.Meta>
					{speaker.role && <span>{speaker.role}&nbsp;</span>}

					{speaker.ministry && (
						<span>
							{speaker.role && <span>&middot;</span>}
							{speaker.website ? (
								<Card.MetaLink to={speaker.website}>
									{speaker.ministry}
								</Card.MetaLink>
							) : (
								<span>{speaker.ministry}</span>
							)}
						</span>
					)}
					<span>&nbsp;</span>
				</Card.Meta>
			</div>

			<FauxLink to={speaker.slug}>{`Talks by ${speaker.title}`}</FauxLink>
		</Card>
	);
}
