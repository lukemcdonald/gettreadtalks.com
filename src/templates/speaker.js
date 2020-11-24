import React from 'react';
import { graphql } from 'gatsby';
import { maybePluralize } from '../utilities';

import Avatar from '../components/avatar';
import ConditionalWrapper from '../components/wrapper';
import Intro from '../components/intro';
import Link from '../components/link';
import Section from '../components/section';
import SEO from '../components/seo';
import Talks from '../components/talks';
import Page from '../components/page';
import SpeakersFilter from '../components/speakers/filter';

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
						className="block w-24 m-auto mb-4 rounded-full shadow-lg"
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

				<Intro.Tagline>
					{speaker?.role || ''}
					<span className="mx-1 text-gray-500">&bull;</span>
					{maybePluralize(speaker.talks.length, `Talk`)}
				</Intro.Tagline>
			</Intro>

			<Section>
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
					<Talks
						className="grid gap-6"
						talks={speaker.talks}
						disable={['avatar']}
					/>
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
					}
				}
				talks {
					id
					fields {
						slug
					}
					data {
						title
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
