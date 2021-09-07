import React, { Fragment, useEffect, useState } from 'react'

import { Card } from 'components/card'
import { FauxLink } from 'components/fauxLink'
import { useUsers } from 'context/users'

function TalkCard({ talk }) {
	const [icons, setIcons] = useState(() =>
		talk?.favorite ? [{ type: 'featured', to: '/talks/featured/' }] : []
	)

	const { user } = useUsers()

	useEffect(() => {
		if (user && user?.favoriteTalks && user.favoriteTalks.includes(talk.id)) {
			setIcons((icons) => [
				{ type: 'favorite', to: '/account/favorites/' },
				{ type: 'finished', to: '/account/finished/' },
				...icons,
			])
		}
	}, [talk, user])

	return (
		<Card icons={icons}>
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
			</div>

			{talk?.slug && talk?.slug && (
				<FauxLink to={talk.slug}>{`Listen to ${talk.title}`}</FauxLink>
			)}
		</Card>
	)
}

export { TalkCard }
