import React, { useEffect, useState } from 'react'
import { navigate, graphql } from 'gatsby'

import { Page } from 'components/page'
import { Section } from 'components/section'
import { SEO } from 'components/seo'
import { TalksList } from 'components/talks/list'

import { useAuth } from 'context/auth'
import { useUsers } from 'context/users'
import { AccountMenu } from 'components/menus/account'

function AccountFavoritesPage({ data, location }) {
	const [favoriteTalks, setFavoriteTalks] = useState([])
	const { isUser } = useAuth()
	const { user } = useUsers()
	const { talks } = data

	useEffect(() => {
		if (!isUser) navigate('/login')
		return null
	})

	useEffect(() => {
		if (!talks || !user?.favoriteTalks) return null

		// Get user favorites from all talks.
		const favorites = talks.nodes.filter(({ id }) =>
			user.favoriteTalks.includes(id)
		)

		// Update order of favorites to match order of user favorites.
		// The latest favorited talk should be shown first.
		let sortedFavorites = []
		user.favoriteTalks.map((id) => {
			const favoriteIndex = favorites.findIndex((fav) => fav.id === id)

			if (favorites[favoriteIndex].id === id) {
				sortedFavorites = [...sortedFavorites, favorites[favoriteIndex]]
			}

			return sortedFavorites
		})

		setFavoriteTalks(sortedFavorites)
	}, [talks, user])

	return (
		<>
			<SEO title="Favorite Talks" location={location} />

			<Section>
				<Section.Sidebar>
					<AccountMenu />
				</Section.Sidebar>

				<Section.Content>
					<Page.Title>Your Favorites</Page.Title>

					<hr className="my-6 border-t border-gray-200" />

					{!Array.isArray(favoriteTalks) || !favoriteTalks.length ? (
						<p>
							You have not added any talks to your favorites list. To favorite a
							talk, click on the ♡ when on the the talk page.
						</p>
					) : (
						<TalksList talks={favoriteTalks} />
					)}
				</Section.Content>
			</Section>
		</>
	)
}

export default AccountFavoritesPage

export const query = graphql`
	query {
		talks: allAirtableTalk(
			filter: { data: { publishedDate: { ne: null } } }
			sort: { fields: data___publishedDate, order: DESC }
		) {
			totalCount
			nodes {
				id
				fields {
					slug
				}
				data {
					title
					favorite
					publishedDate(formatString: "YYYYMMDD")
					scripture
					speakers {
						id
						fields {
							slug
						}
						data {
							title
							avatar {
								localFiles {
									childImageSharp {
										gatsbyImageData(
											width: 128
											placeholder: TRACED_SVG
											layout: CONSTRAINED
										)
									}
								}
							}
						}
					}
				}
			}
		}
	}
`
