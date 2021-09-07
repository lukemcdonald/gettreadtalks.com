import React, { useEffect, useState } from 'react'

import { maybePluralize } from 'utils/misc'

import { Card } from 'components/card'
import { FauxLink } from 'components/fauxLink'
import { useUsers } from 'context/users'

function SpeakerCard({ speaker }) {
	const [icons, setIcons] = useState(() =>
		speaker?.favorite ? [{ type: 'featured', to: '/speakers/featured/' }] : []
	)

	const { user } = useUsers()

	useEffect(() => {
		if (
			user &&
			user?.favoriteSpeakers &&
			user.favoriteSpeakers.includes(speaker.id)
		) {
			setIcons((icons) => [
				{ type: 'favorite', to: '/account/favorites/' },
				...icons,
			])
		}
	}, [speaker, user])

	return (
		<Card icons={icons}>
			{speaker?.avatar && (
				<Card.Avatar image={speaker.avatar} alt={speaker.title} />
			)}

			<div>
				{speaker?.title && <Card.Title as="h2">{speaker.title}</Card.Title>}

				<Card.Meta>
					{speaker?.role && <span>{speaker.role}</span>}

					{speaker?.role && speaker.ministry && (
						<span className="mx-1">&middot;</span>
					)}

					{speaker?.ministry && (
						<span>
							{speaker?.website ? (
								<Card.MetaLink to={speaker.website}>
									{speaker.ministry}
								</Card.MetaLink>
							) : (
								<span>{speaker.ministry}</span>
							)}
						</span>
					)}

					{(speaker?.role || speaker?.ministry) && speaker?.talks && (
						<span className="mx-1">&middot;</span>
					)}

					{speaker?.talks && maybePluralize(speaker.talks.length, 'Talk')}
				</Card.Meta>
			</div>

			{speaker?.slug && speaker?.title && (
				<FauxLink to={speaker.slug}>{`Talks by ${speaker.title}`}</FauxLink>
			)}
		</Card>
	)
}

export { SpeakerCard }
