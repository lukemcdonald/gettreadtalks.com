import React from 'react';
import { Link } from 'gatsby';

import Card from '../card';
import CardAvatar from '../cardAvatar';
import FauxLink from '../fauxLink';

export default function TalkCard({ talk }) {
	return (
		<Card id={talk.id}>
			<div>
				{!talk.hideAvatar &&
					talk.speakers.map(({ id, data = { avatar: '', title: '' } }) => (
						<CardAvatar key={id} data={data.avatar} title={data.title} />
					))}

				<div>
					<header>
						{talk.title && <h2>{talk.title}</h2>}
						{talk.subtitle && <h3>{talk.subtitle}</h3>}
					</header>

					<footer>
						{talk.speakers.map(({ id, data, fields }) => (
							<span key={id}>
								<span>By</span>&nbsp;
								<Link to={fields.slug}>{data.title}</Link>
								&nbsp;
							</span>
						))}

						{talk.scripture && (
							<span>
								<span>from</span> {talk.scripture}
							</span>
						)}
					</footer>
				</div>
			</div>

			<FauxLink to={talk.slug}>{`Listen to ${talk.title}`}</FauxLink>
		</Card>
	);
}
