import { Link } from 'gatsby';
import React, { Fragment } from 'react';

import Card from '../card';
import FauxLink from '../fauxLink';
import StarSVG from '../svgs/star';

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

				{talk?.favorite && (
					<Link
						to="/talks/featured/"
						className="absolute z-20 w-5 h-5 text-red-600 transition transform rotate-12 -right-2 -top-2 hover:rotate-45"
					>
						<StarSVG />
					</Link>
				)}
			</div>

			<FauxLink to={talk.slug}>{`Listen to ${talk.title}`}</FauxLink>
		</Card>
	);
}
