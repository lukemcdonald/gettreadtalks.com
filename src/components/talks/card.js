import React, { Fragment } from 'react';

import Card from '../card';
import FauxLink from '../fauxLink';

export default function Talk({ talk }) {
	return (
		<Card>
			{talk?.speakers.map(
				(speaker) =>
					speaker.data?.avatar && (
						<Card.Avatar
							key={speaker.id}
							image={speaker.data?.avatar}
							alt={speaker.data?.title}
						/>
					)
			)}

			<div>
				{talk?.subtitle && (
					<Card.SubTitle as="h3">{talk.subtitle}</Card.SubTitle>
				)}

				{talk?.title && <Card.Title as="h2">{talk.title}</Card.Title>}

				<Card.Meta>
					{talk?.speakers.map((speaker) => (
						<Fragment key={speaker.id}>
							{speaker.data?.title && speaker.fields?.slug && (
								<span>
									<Card.MetaLink to={speaker.fields.slug}>
										{speaker.data.title}
									</Card.MetaLink>
								</span>
							)}

							{talk?.scripture && <span className="mx-1">&middot;</span>}
						</Fragment>
					))}

					{talk?.scripture && <span>{talk.scripture}</span>}
				</Card.Meta>

				{talk?.favorite && <Card.FeaturedLink to="/talks/featured/" />}
			</div>

			{talk?.slug && talk?.slug && (
				<FauxLink to={talk.slug}>{`Listen to ${talk.title}`}</FauxLink>
			)}
		</Card>
	);
}
