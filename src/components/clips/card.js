import { Link } from 'gatsby';
import React from 'react';

import Card, { Avatar, Meta, Title } from '../card';
import FauxLink from '../fauxLink';

export default function ClipCard({ clip }) {
	return (
		<Card id={clip.id}>
			{clip.speakers.map(({ id, data }) => (
				<Avatar key={id} data={data.avatar} title={data.title} />
			))}

			<div>
				<Title as="h2">{clip.title}</Title>

				<Meta>
					{clip.speakers.map(({ id, data, fields }) => (
						<span key={id}>
							<span>By</span>&nbsp;
							<Link to={fields.slug}>{data.title}</Link>
							&nbsp;
						</span>
					))}
				</Meta>
			</div>

			<FauxLink to={clip.slug}>{`Listen to ${clip.title}`}</FauxLink>
		</Card>
	);
}
