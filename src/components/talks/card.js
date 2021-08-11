import React, { Fragment } from 'react'

import { Card } from 'components/card'
import { FauxLink } from 'components/fauxLink'

import { useUsersFavoriteTalks } from 'hooks/useUsersFavoriteTalks'
import { useUsers } from 'context/users'

function TalkCard({ talk }) {
	const { toggleFavoriteTalk } = useUsersFavoriteTalks(talk)
	const [talkId, setTalkId] = React.useState(talk.id)
	const [favorite, setFavorite] = React.useState(false)
	const { profile } = useUsers()

	React.useEffect(() => {
		if (!profile) {
			return
		}

		if (
			profile?.favoriteTalks &&
			profile.favoriteTalks.some((id) => id === talkId)
		) {
			setFavorite(true)
		}
	}, [profile, talkId])

	return (
		<Card>
			<Card.FavoriteButton
				className="absolute bottom-0 right-0 z-50 w-8 h-8 p-1 m-1 text-gray-300 rounded hover:text-red-600"
				onClick={() => toggleFavoriteTalk({ id: talkId })}
				isFavorite={favorite}
			/>
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
