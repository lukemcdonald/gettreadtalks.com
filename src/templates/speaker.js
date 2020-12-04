import React from 'react';
import { graphql } from 'gatsby';
import classnames from 'classnames';
import { maybePluralize } from '../utilities';

import Avatar from '../components/avatar';
import Clips from '../components/clips';
import ConditionalWrapper from '../components/wrapper';
import Intro from '../components/intro';
import Link from '../components/link';
import Page from '../components/page';
import Section from '../components/section';
import SEO from '../components/seo';
import SpeakersFilter from '../components/speakers/filter';
import Talks from '../components/talks';
import TextCarousel from '../components/textCarousel';

export default function SingleSpeakerPage({ data, location, pageContext }) {
	const {
		speakers,
		speaker: { data: speaker },
	} = data;

	return (
		<>
			<SEO
				title={speaker.title}
				description={speaker.description?.childMarkdownRemark.excerpt}
				image={speaker.avatar?.localFiles?.[0]?.publicURL}
				location={location}
			/>

			<Intro image={speaker?.banner}>
				<Intro.Title>
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

			<Section className="relative">
				<TextCarousel text={`${speaker?.role || 'Ambassador'} for Christ`} />
				<Section.Sidebar sticky>
					{speaker.description && (
						<>
							<Section.Heading as="h2">About</Section.Heading>

							<Page.Title />

							<div
								className="mt-3 prose"
								dangerouslySetInnerHTML={{
									__html: speaker.description?.childMarkdownRemark.html,
								}}
							/>
						</>
					)}

					{speaker.ministry && (
						<>
							<Section.Heading as="h3" className="mt-8">
								Ministry
							</Section.Heading>

							<p className="prose">
								<ConditionalWrapper
									condition={speaker.website}
									wrapper={(children) => (
										<Link to={speaker.website}>{children}</Link>
									)}
								>
									{speaker.ministry}
								</ConditionalWrapper>
							</p>
						</>
					)}
				</Section.Sidebar>

				<Section.Content>
					{speaker.talks && (
						<>
							<Section.Heading>
								<span>
									{maybePluralize(speaker.talks.length, `Talk`, {
										showCount: false,
									})}
								</span>
							</Section.Heading>

							<Talks
								className="grid gap-6"
								talks={speaker.talks}
								disable={['avatar']}
							/>
						</>
					)}

					{speaker.clips && (
						<>
							<Section.Heading
								className={classnames(speaker.talks ? 'mt-12' : '')}
							>
								<span>
									{maybePluralize(speaker.clips.length, `Clip`, {
										showCount: false,
									})}
								</span>
							</Section.Heading>

							<Clips
								className="grid gap-6"
								clips={speaker.clips}
								disable={['avatar']}
							/>
						</>
					)}
				</Section.Content>
			</Section>
		</>
	);
}

export const query = graphql`
	query($id: String!) {
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
				avatar {
					localFiles {
						publicURL
						childImageSharp {
							fluid(maxWidth: 128) {
								...GatsbyImageSharpFluid_tracedSVG
							}
						}
					}
				}
				banner {
					localFiles {
						childImageSharp {
							fluid(maxWidth: 1600, grayscale: true) {
								...GatsbyImageSharpFluid_tracedSVG
							}
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
								avatar {
									localFiles {
										childImageSharp {
											fluid(maxWidth: 128) {
												...GatsbyImageSharpFluid_tracedSVG
											}
										}
									}
								}
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
								avatar {
									localFiles {
										childImageSharp {
											fluid(maxWidth: 128) {
												...GatsbyImageSharpFluid_tracedSVG
											}
										}
									}
								}
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
`;
