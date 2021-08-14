// @todo: Make favorite talks page.
// Maybe make favorite talks link to a talk archive page
// with the user id in url. Use the user ID from the URL to
// get and display favorite talks. Alternatively, just the page query
// or useStaticQuery here.
// e.g. http://localhost:8000/talks/favorite/T1yhOR7AalS0rgHqOz4qEihHoKG3

// @todo: Make finished talks page.
// Implementation might would be similar to how favorite talks would work.
// e.g. http://localhost:8000/talks/history/T1yhOR7AalS0rgHqOz4qEihHoKG3

import React, { useEffect, useState } from 'react'
import { navigate, graphql } from 'gatsby'

import { Page } from 'components/page'
import { Section } from 'components/section'
import { SEO } from 'components/seo'
import { TalksList } from 'components/talks/list'

import { useAuth } from 'context/auth'
import { FavoriteTalksTestControls } from 'hooks/useFavoriteTalk'
import { useUsers } from 'context/users'

function AccountPage({ data, location }) {
	const { isUser } = useAuth()
	const { user } = useUsers()
	const { talks } = data

	const [favoriteTalks, setFavoriteTalks] = useState([])

	if (!isUser) {
		navigate('/login')
	}

	useEffect(() => {
		console.log('rendering')

		if (!talks || !user?.favoriteTalks) {
			return
		}

		// @todo: Make sure order is set to the last favorite talk listed first.
		const favorites = talks.nodes.filter(({ id }) =>
			user.favoriteTalks.includes(id)
		)

		setFavoriteTalks(favorites)
	}, [talks, user])

	return (
		<>
			<SEO title="Your Account" location={location} />

			<Section>
				<Section.Sidebar>
					<Page.Title>Your Account</Page.Title>
					<FavoriteTalksTestControls />
				</Section.Sidebar>

				<Section.Content>
					<h2 className="text-xl font-bold">Favorite Talks</h2>
					{favoriteTalks && <TalksList talks={favoriteTalks} />}
					{user && (
						<pre className="mt-6">
							<ul className="prose">
								{Object.keys(user).map((key) => (
									<li key={key}>
										<strong>{key}:</strong>
										{key === 'favoriteTalks' && user[key] && (
											<ol>
												{user[key].map(
													(data, index) =>
														data && (
															<li key={`favoriteTalk-${index}`}>
																{data.toString()}
															</li>
														)
												)}
											</ol>
										)}

										{key !== 'favoriteTalks' && user[key].toString()}
									</li>
								))}
							</ul>
						</pre>
					)}
				</Section.Content>
			</Section>
		</>
	)
}

export default AccountPage

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
