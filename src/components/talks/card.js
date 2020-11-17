import React from 'react';

import Card from '../card';
import FauxLink from '../fauxLink';

export default function Talk({ talk }) {
	return (
		<Card id={talk.id}>
			{!talk.hideAvatar &&
				talk.speakers.map(({ id, data = { avatar: '', title: '' } }) => (
					<Card.Avatar key={id} image={data.avatar} title={data.title} />
				))}

			<div>
				{talk.title && <Card.Title as="h2">{talk.title}</Card.Title>}

				{talk.subtitle && (
					<Card.SubTitle as="h3">{talk.subtitle}</Card.SubTitle>
				)}

				<Card.Meta>
					{talk.speakers.map(({ id, data, fields }) => (
						<span key={id}>
							<Card.MetaLink key={id} to={fields.slug}>
								{data.title}
							</Card.MetaLink>
							&nbsp;
						</span>
					))}

					{talk.scripture && <span>&middot;&nbsp;{talk.scripture}</span>}
				</Card.Meta>
			</div>

			<FauxLink to={talk.slug}>{`Listen to ${talk.title}`}</FauxLink>
		</Card>
	);
}
