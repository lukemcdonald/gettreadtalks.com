import React from 'react';
import classnames from 'classnames';
import { textSize } from 'tailwindcss/defaultConfig';

import Card, { Avatar, Meta, MetaLink, Title } from '../card';
import FauxLink from '../fauxLink';

// console.log(textSize);

export default function SpeakerCard({ size, speaker }) {
	return (
		<Card id={speaker.id}>
			{speaker.avatar && <Avatar data={speaker.avatar} title={speaker.title} />}

			<div>
				{speaker.title && (
					<Title
						level="2"
						className={classnames('', size === 'small' ? 'text-sm' : '')}
					>
						{speaker.title}
					</Title>
				)}

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
