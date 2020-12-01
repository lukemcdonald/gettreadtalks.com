import React from 'react';
import { maybePluralize } from '../../utilities';

import Card from '../card';
import FauxLink from '../fauxLink';
import Link from '../link';
import StarSVG from '../svgs/star';

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

				{speaker?.favorite && (
					<Link
						to="/speakers/featured/"
						className="absolute z-20 w-5 h-5 text-red-600 transition transform rotate-12 -right-2 -top-2 hover:rotate-45"
					>
						<StarSVG />
					</Link>
				)}
			</div>

			<FauxLink to={speaker.slug}>{`Talks by ${speaker.title}`}</FauxLink>
		</Card>
	);
}
