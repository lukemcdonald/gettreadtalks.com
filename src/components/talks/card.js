import React from 'react';
import { Link } from 'gatsby';

import Card from '../card';
import CardAvatar from '../cardAvatar';
import FauxLink from '../fauxLink';

export default function TalkCard({ talk }) {
	return (
		<Card id={talk.id}>
			{!talk.hideAvatar &&
				talk.speakers.map(({ id, data = { avatar: '', title: '' } }) => (
					<CardAvatar key={id} data={data.avatar} title={data.title} />
				))}

			<div>
				<header>
					{talk.title && <h2 className="text-xl font-bold">{talk.title}</h2>}
					{talk.subtitle && <h3>{talk.subtitle}</h3>}
				</header>

				<footer className="mt-px text-sm text-gray-500">
					{talk.speakers.map(({ id, data, fields }) => (
						<span key={id}>
							<span className="sr-only">By&nbsp;</span>
							<Link to={fields.slug}>{data.title}</Link>
							&nbsp;
						</span>
					))}

					{talk.scripture && (
						<span>
							<span>&middot;</span> {talk.scripture}
						</span>
					)}
				</footer>
			</div>
			<FauxLink to={talk.slug}>{`Listen to ${talk.title}`}</FauxLink>
		</Card>
	);
}
