import React from 'react';

import Card, { Avatar, Meta, MetaLink, Title } from '../card';
import FauxLink from '../fauxLink';

export default function SpeakerCard({ speaker }) {
	return (
		<Card id={speaker.id}>
			{speaker.avatar && <Avatar data={speaker.avatar} title={speaker.title} />}

			<div>
				{speaker.title && <Title level="2">{speaker.title}</Title>}

				<Meta>
					{speaker.role && <span>{speaker.role}&nbsp;</span>}

					{speaker.ministry && (
						<span>
							{speaker.role && <span>&middot;</span>}
							{speaker.website ? (
								<MetaLink to={speaker.website}>{speaker.ministry}</MetaLink>
							) : (
								<span>{speaker.ministry}</span>
							)}
						</span>
					)}
					<span>&nbsp;</span>
				</Meta>
			</div>

			<FauxLink to={speaker.slug}>{`Talks by ${speaker.title}`}</FauxLink>
		</Card>
	);
}
