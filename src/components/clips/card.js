import { Link } from 'gatsby';
import React from 'react';

import Card, { Avatar } from '../card';
import FauxLink from '../fauxLink';

export default function ClipCard({ clip }) {
	return (
		<Card id={clip.id}>
			<div>
				{clip.speakers.map(({ id, data }) => (
					<Avatar key={id} data={data.avatar} title={data.title} />
				))}

				<div>
					<header>
						<h2>{clip.title}</h2>
					</header>

					<footer>
						{clip.speakers.map(({ id, data, fields }) => (
							<span key={id}>
								<span>By</span>&nbsp;
								<Link to={fields.slug}>{data.title}</Link>
								&nbsp;
							</span>
						))}
					</footer>
				</div>
			</div>

			<FauxLink to={clip.slug}>{`Listen to ${clip.title}`}</FauxLink>
		</Card>
	);
}
