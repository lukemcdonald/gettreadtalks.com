import React from 'react';

import Card, { Avatar, Meta, MetaLink, SubTitle, Title } from '../card';
import FauxLink from '../fauxLink';

export default function Talk({ talk }) {
	return (
		<Card id={talk.id} className="flex">
			{!talk.hideAvatar &&
				talk.speakers.map(({ id, data = { avatar: '', title: '' } }) => (
					<Avatar key={id} data={data.avatar} title={data.title} />
				))}

			<div>
				{talk.title && <Title level="2">{talk.title}</Title>}
				{talk.subtitle && <SubTitle level="3">{talk.subtitle}</SubTitle>}

				<Meta>
					{talk.speakers.map(({ id, data, fields }) => (
						<span key={id}>
							<MetaLink key={id} to={fields.slug}>
								{data.title}
							</MetaLink>
							&nbsp;
						</span>
					))}

					{talk.scripture && <span>&middot;&nbsp;{talk.scripture}</span>}
				</Meta>
			</div>

			<FauxLink to={talk.slug}>{`Listen to ${talk.title}`}</FauxLink>
		</Card>
	);
}
