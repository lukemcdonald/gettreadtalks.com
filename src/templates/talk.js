import React, { useState } from 'react'
import { graphql } from 'gatsby'
import { MailIcon, ExternalLinkIcon } from '@heroicons/react/outline'

import { FavoriteToggle } from 'components/talks/favorite-toggle'
import { FinishedToggle } from 'components/talks/finished-toggle'
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

	const speaker = {
		...talk.speakers[0].data,
		...talk.speakers[0].fields,
	}

	const [moreTalks] = useState(
		() => speaker.talks.filter((item) => item.id !== pageContext.id) || []
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
				title={`${talk.title} by ${speaker.title}`}
				description={`Listen to ${talk.title} by ${speaker.title} from ${talk.scripture}.`}
				location={location}
			/>

			<Intro align="wide--center" bgGradient fullscreen>
				<Intro.Title>{talk.title}</Intro.Title>

				<Intro.Tagline className="sm:justify-center sm:flex sm:space-x-2">
					<div>
						<span>by</span>&nbsp;
						<Link className="hover:underline" to={speaker.slug}>
							{speaker.title}
						</Link>
					</div>
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

			<Section
				className="text-white bg-gray-900"
				separator="top"
				separatorClass="border-gray-700"
			>
				<Section.Sidebar>
					<Section.Heading as="h2" className="text-gray-400">
						Actions
					</Section.Heading>

					<div className="flex mt-3">
						<FavoriteToggle
							talk={talk}
							className="relative w-10 h-10 mb-2 mr-2"
							classNameToggle={{
								on: 'rounded-full p-2 bg-favorite-700',
								off: 'rounded-full p-2 bg-gray-600 hover:bg-favorite-700',
							}}
						/>

						<FinishedToggle
							talk={talk}
							className="relative w-10 h-10 mb-2 mr-2"
							classNameToggle={{
								on: 'rounded-full p-2 bg-finished-700',
								off: 'rounded-full p-2 bg-gray-600 hover:bg-finished-700',
							}}
						/>

						<a
							href={`mailto:?subject=${encodeURIComponent(
								talk.title
							)}&body=${encodeURIComponent(window.location.href)}`}
							className="inline-block w-10 h-10 mb-2 mr-2"
						>
							<MailIcon className="p-2 bg-gray-600 rounded-full hover:bg-gray-800" />
						</a>
					</div>
				</Section.Sidebar>

				<Section.Content>
					<Section.Heading as="h2" className="text-gray-400">
						Topics
					</Section.Heading>

					<div className="mt-3">
						{talk?.topics.map(({ data, fields }) => (
							<Link.Button
								key={fields.slug}
								className="mb-2 mr-2"
								to={fields.slug}
							>
								{data.title}
							</Link.Button>
						))}
					</div>
				</Section.Content>

				{talk.scripture && (
					<Section.Sidebar className="pb-6">
						<Section.Heading as="h2" className="text-gray-400">
							Scripture
						</Section.Heading>
						<div className="prose text-white">
							<Link.Button
								to={`https://www.biblegateway.com/passage/?search=${encodeURI(
									talk.scripture
								)}&version=esv`}
								className="inline-flex items-center"
							>
								<span>{talk.scripture}</span>
								<ExternalLinkIcon className="w-5 h-5 ml-2 opacity-80" />
							</Link.Button>
						</div>
					</Section.Sidebar>
				)}
			</Section>

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
								Enjoy{' '}
								{speaker.talks.length >= 2 ? 'more talks' : 'another talk'} by{' '}
								{speaker.title}.
							</p>
						</div>
					</Section.Sidebar>

					<Section.Content>
						<TalksList talks={shuffledTalks.slice(0, 5)} />

						{speaker.talks.length > 5 && (
							<p className="mt-6">
								<Link className="font-medium hover:underline" to={speaker.slug}>
									More by {speaker.title} &rarr;
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
				speakers {
					id
					fields {
						slug
					}
					data {
						title
						talks {
							id
							fields {
								slug
							}
							data {
								title
								speakers {
									data {
										title
									}
								}
								favorite
								publishedDate(formatString: "YYYYMMDD")
							}
						}
					}
				}
				topics {
					data {
						title
					}
					fields {
						slug
					}
				}
			}
		}
	}
`
