// todo: Implement finsihed content functionality.

import React, { useEffect, useState } from 'react'
import { navigate, graphql } from 'gatsby'
import { CheckCircleIcon as CheckIcon } from '@heroicons/react/outline'

import { Page } from 'components/page'
import { Section } from 'components/section'
import { SEO } from 'components/seo'
import { TalksList } from 'components/talks/list'
import { Link } from 'components/link'

import { useAuth } from 'context/auth'
import { useUsers } from 'context/users'
import { AccountMenu } from 'components/menus/account'

function AccountFinishedPage({ data, location }) {
	const [finishedTalks, setFinishedTalks] = useState([])
	const { isUser } = useAuth()
	const { user } = useUsers()
	const { talks } = data

	useEffect(() => {
		if (!talks || !user?.finishedTalks) return null

		// Get user finished from all talks.
		const finished = talks.nodes.filter(({ id }) =>
			user.finishedTalks.includes(id)
		)

		// Update order of finished to match order of user finished.
		// The latest favorited talk should be shown first.
		let sortedFinished = []
		user.finishedTalks.map((id) => {
			const favoriteIndex = finished.findIndex((fav) => fav.id === id)

			if (finished[favoriteIndex].id === id) {
				sortedFinished = [...sortedFinished, finished[favoriteIndex]]
			}

			return sortedFinished
		})

		setFinishedTalks(sortedFinished)
	}, [talks, user])

	if (!isUser) {
		navigate('/login/')
		return null
	}

	return (
		<>
			<SEO title="Favorite Talks" location={location} />

			<Section>
				<Section.Sidebar>
					<AccountMenu />
				</Section.Sidebar>

				<Section.Content>
					{!Array.isArray(finishedTalks) || !finishedTalks.length ? (
						<Link
							to="/talks/"
							type="button"
							className="relative block w-full p-12 text-center border-2 border-gray-300 border-dashed rounded-lg hover:border-gray-400"
						>
							<Page.Title>Finished Content</Page.Title>
							<p className="mt-2">
								Click the{' '}
								{<CheckIcon className="inline w-6 h-6 text-gray-400" />} to mark
								an item as finished.
							</p>
						</Link>
					) : (
						<div className="divide-y divide-gray-200">
							<Page.Title>Your Finished Talks</Page.Title>
							<TalksList talks={finishedTalks} />
						</div>
					)}
				</Section.Content>
			</Section>
		</>
	)
}

export default AccountFinishedPage

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
					speaker
					speakers {
						data {
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
