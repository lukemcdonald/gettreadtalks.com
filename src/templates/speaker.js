import React from 'react'
import { graphql } from 'gatsby'
import { maybePluralize } from '../utilities'

import { Avatar } from '../components/avatar'
import { ClipsList } from '../components/clips/list'
import { ConditionalWrapper } from '../components/conditionalWrapper'
import { Intro } from '../components/intro'
import { Link } from '../components/link'
import { Section } from '../components/section'
import { SEO } from '../components/seo'
import { SpeakersFilter } from '../components/speakers/filter'
import { TalksList } from '../components/talks/list'
import { TextCarousel } from '../components/textCarousel'

function SingleSpeakerPage({ data, location, pageContext }) {
	const {
		speakers,
		speaker: { data: speaker },
	} = data

	return (
		<>
			<SEO
				title={speaker.title}
				description={speaker.description?.childMarkdownRemark.excerpt}
				image={speaker.avatar?.localFiles?.[0]?.publicURL}
				location={location}
			/>

			<Intro image={speaker?.banner}>
				<Intro.Title className="flex flex-col">
					<Avatar
						className="block w-24 m-auto mb-4 border-4 border-white rounded-full shadow-lg"
						image={speaker.avatar}
						title={speaker.title}
					/>

					<SpeakersFilter
						speakers={speakers.nodes}
						current={{
							value: pageContext.slug,
							label: speaker.title,
						}}
					/>
				</Intro.Title>

				<Intro.Tagline className="text-center">
					{speaker?.role || ''}
				</Intro.Tagline>
			</Intro>

			<Section
				className="bg-gray-900"
				separator={!speaker.banner && 'top'}
				separatorClass="border-gray-700"
			>
				{speaker.ministry && (
					<Section.Sidebar>
						<Section.Heading as="h2" className="text-gray-400">
							Ministry
						</Section.Heading>

						<p className="mt-3 prose text-white">
							<ConditionalWrapper
								condition={speaker.website}
								wrapper={(children) => (
									<Link to={speaker.website}>{children}</Link>
								)}
							>
								{speaker.ministry}
							</ConditionalWrapper>
						</p>
					</Section.Sidebar>
				)}

				<Section.Content>
					{speaker.description && (
						<>
							<Section.Heading as="h2" className="text-gray-400">
								About
							</Section.Heading>

							<div
								className="mt-3 prose text-white"
								dangerouslySetInnerHTML={{
									__html: speaker.description?.childMarkdownRemark.html,
								}}
							/>
						</>
					)}
				</Section.Content>
			</Section>

			{speaker?.talks && (
				<Section className="relative">
					<TextCarousel text={`${speaker?.role || 'Ambassador'} for Christ`} />

					<Section.Sidebar sticky>
						<Section.Heading>
							{maybePluralize(speaker.talks.length, `Talk`, {
								showCount: false,
							})}
						</Section.Heading>
						<p className="prose">
							Enjoy more talks by {speaker.role} {speaker.title}.
						</p>
					</Section.Sidebar>

					<Section.Content>
						<TalksList talks={speaker.talks} />
					</Section.Content>
				</Section>
			)}

			{speaker.clips && (
				<Section separator={speaker.talks && 'top'}>
					<Section.Sidebar sticky>
						<Section.Heading>
							<span>
								{maybePluralize(speaker.clips.length, `Clip`, {
									showCount: false,
								})}
							</span>
						</Section.Heading>

						<p className="prose">
							Be encouraged by {speaker.clips.length > 1 ? 'these' : 'this'}{' '}
							short Christ centered{' '}
							{maybePluralize(speaker.clips.length, `clip`, {
								showCount: false,
							})}
							.
						</p>
					</Section.Sidebar>

					<Section.Content>
						<ClipsList clips={speaker.clips} />
					</Section.Content>
				</Section>
			)}
		</>
	)
}

export default SingleSpeakerPage

export const query = graphql`
	query ($id: String!) {
		speaker: airtableSpeaker(id: { eq: $id }) {
			data {
				title
				role
				ministry
				website
				description {
					childMarkdownRemark {
						excerpt
						html
					}
				}
				banner {
					localFiles {
						childImageSharp {
							gatsbyImageData(
								placeholder: TRACED_SVG
								transformOptions: { grayscale: true }
								layout: FULL_WIDTH
							)
						}
					}
				}
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
				clips {
					id
					fields {
						slug
					}
					data {
						title
						path
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
				talks {
					id
					fields {
						slug
					}
					data {
						title
						favorite
						path
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
		speakers: allAirtableSpeaker(
			filter: { data: { title: { ne: null } } }
			sort: { fields: data___lastName, order: ASC }
		) {
			totalCount
			nodes {
				id
				fields {
					slug
				}
				data {
					firstName
					lastName
				}
			}
		}
	}
`
