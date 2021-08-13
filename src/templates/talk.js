import React, { useState } from 'react'
import { graphql } from 'gatsby'

import { FavoriteToggle } from 'components/talks/favoriteToggle'
import { Intro } from 'components/intro'
import { Link } from 'components/link'
import { Section } from 'components/section'
import { SEO } from 'components/seo'
import { SeriesList } from 'components/series/list'
import { TalksList } from 'components/talks/list'
import { arrayShuffle } from 'utils/misc'

function TalkPage({ data, location, pageContext }) {
	const talk = {
		id: data.talk.id,
		...data.talk.data,
	}
	const { talks } = talk.speakers[0].data

	const [moreTalks] = useState(
		() => talks.filter((item) => item.id !== pageContext.id) || []
	)
	const [shuffledTalks] = useState(() => arrayShuffle(moreTalks))

	const mediaObject = talk?.link?.childMarkdownRemark
	const media = mediaObject ? mediaObject.html : ''

	const mediaLink =
		mediaObject?.htmlAst?.children[0]?.children[1]?.properties?.href

	const hasVideo = media.includes('<iframe')
	const hasTalks = moreTalks.length > 0
	const hasSeries = talk?.series

	return (
		<>
			<SEO
				title={`${talk.title} by ${talk.speaker}`}
				description={`Listen to ${talk.title} by ${talk.speaker} from ${talk.scripture}.`}
				location={location}
			/>

			<Intro align="wide--center" bgGradient fullscreen>
				<FavoriteToggle
					talk={talk}
					className="w-8 h-8 p-1 bg-gray-200"
					classNameToggle={{
						on: 'text-red-600 hover:text-red-600',
						off: 'text-gray-700 hover:text-red-600',
					}}
				/>

				<Intro.Title>{talk.title}</Intro.Title>

				<Intro.Tagline className="sm:justify-center sm:flex sm:space-x-2">
					<div>
						<span className="text-gray-500">by</span>&nbsp;
						<Link className="hover:underline" to={talk.speakers[0].fields.slug}>
							{talk.speaker}
						</Link>
					</div>

					{talk.scripture && (
						<>
							<div className="hidden text-gray-500 sm:block">&bull;</div>
							<div className="hidden sm:block">{talk.scripture}</div>
						</>
					)}
				</Intro.Tagline>

				{hasVideo && (
					<div
						className="mt-10 rounded shadow-lg embed-responsive aspect-ratio-16x9"
						dangerouslySetInnerHTML={{
							__html: talk?.link?.childMarkdownRemark.html,
						}}
					/>
				)}

				{!hasVideo && mediaLink && (
					<p className="mt-10 text-center">
						<Link.Button
							to={mediaLink}
							color="primary"
							size="large"
							className="hover:bg-red-700"
						>
							Listen to Talk &rarr;
						</Link.Button>
					</p>
				)}
			</Intro>

			{hasSeries && (
				<Section separator={hasTalks && 'bottom'}>
					<Section.Sidebar sticky>
						<Section.Heading as="h2">Series</Section.Heading>

						<div className="prose">
							<p>This talk is part of a series of related talks.</p>
						</div>
					</Section.Sidebar>

					<Section.Content>
						<SeriesList series={talk.series} />
					</Section.Content>
				</Section>
			)}

			{hasTalks && (
				<Section>
					<Section.Sidebar sticky>
						<Section.Heading as="h2">Talks</Section.Heading>

						<div className="prose">
							<p>
								Enjoy {talks.length >= 2 ? 'more talks' : 'another talk'} by{' '}
								{talk.speaker}.
							</p>
						</div>
					</Section.Sidebar>

					<Section.Content>
						<TalksList talks={shuffledTalks.slice(0, 5)} />

						{talks.length > 5 && (
							<p className="mt-6">
								<Link
									className="font-medium hover:underline"
									to={talk.speakers[0].fields.slug}
								>
									More by {talk.speaker} &rarr;
								</Link>
							</p>
						)}
					</Section.Content>
				</Section>
			)}
		</>
	)
}

export default TalkPage

export const query = graphql`
	query ($id: String!) {
		talk: airtableTalk(id: { eq: $id }) {
			id
			data {
				title
				favorite
				link {
					childMarkdownRemark {
						html
						htmlAst
					}
				}
				scripture
				series {
					id
					fields {
						slug
					}
					data {
						title
						publishedTalksCount
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
				speaker
				speakers {
					id
					fields {
						slug
					}
					data {
						talks {
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
