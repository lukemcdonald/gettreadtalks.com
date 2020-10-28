import { Link } from 'gatsby';
import React from 'react';

import Card from '../card';
import CardAvatar from '../cardAvatar';
import FauxLink from '../fauxLink';

export default function SpeakerCard({ speaker }) {
	return (
		<Card id={speaker.id}>
			<div>
				<CardAvatar data={speaker.avatar} title={speaker.title} />

				<div>
					{speaker.title && (
						<header>
							<h2>{speaker.title}</h2>
						</header>
					)}

					<footer>
						{speaker.role && <span>{speaker.role}</span>}

						{speaker.ministry && (
							<span>
								{speaker.website ? (
									<Link to={speaker.website}>
										&nbsp;&middot;&nbsp;{speaker.ministry}
									</Link>
								) : (
									<span>&nbsp;&middot;&nbsp;{speaker.ministry}</span>
								)}
							</span>
						)}
					</footer>
				</div>

				<FauxLink to={speaker.slug}>{`Talks by ${speaker.title}`}</FauxLink>
			</div>
		</Card>
	);
}
