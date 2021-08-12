import React, { Fragment } from 'react'
import classNames from 'classnames'

import { Card } from 'components/card'
import { FauxLink } from 'components/fauxLink'

import {
	HeartIcon,
	FavoriteTalkToggleButton,
} from 'components/talks/toggleFavorite'

function TalkCard({ talk }) {
	return (
		<Card>
			<FavoriteTalkToggleButton talk={talk}>
				{({ checked }) => (
					<HeartIcon
						className={classNames(
							checked
								? 'text-red-600 hover:ring-red-600'
								: 'text-gray-400 hover:text-red-600',
							'relative inline-flex items-center w-8 h-8 p-1 rounded-full z-50 ring-2 ring-transparent'
						)}
						checked={checked}
					/>
				)}
			</FavoriteTalkToggleButton>

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
				<div className="relative z-50">{talk.id}</div>
			</div>

			{talk?.slug && talk?.slug && (
				<FauxLink to={talk.slug}>{`Listen to ${talk.title}`}</FauxLink>
			)}
		</Card>
	)
}

export { TalkCard }
