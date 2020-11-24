import React, { Fragment } from 'react';

import Card from '../card';
import FauxLink from '../fauxLink';

export default function Talk({ disable = [], talk }) {
	disable.map((item) => (talk[item] = ''));

	return (
		<Card className="rounded">
			{!disable.includes('avatar') &&
				talk.speakers.map((speaker) => (
					<Card.Avatar
						key={speaker.id}
						image={speaker.data?.avatar}
						title={speaker.data?.title}
					/>
				))}

			<div>
				{talk.subtitle && (
					<Card.SubTitle as="h3">{talk.subtitle}</Card.SubTitle>
				)}

				{talk.title && <Card.Title as="h2">{talk.title}</Card.Title>}

				<Card.Meta>
					{!disable.includes('speaker') &&
						talk.speakers.map(({ id, data, fields }) => (
							<Fragment key={id}>
								<span>
									<Card.MetaLink key={id} to={fields.slug}>
										{data.title}
									</Card.MetaLink>
								</span>

								{talk.scripture && <span className="mx-1">&middot;</span>}
							</Fragment>
						))}

					{talk.scripture && <span>{talk.scripture}</span>}
				</Card.Meta>
			</div>

			<FauxLink to={talk.slug}>{`Listen to ${talk.title}`}</FauxLink>
		</Card>
	);
}
