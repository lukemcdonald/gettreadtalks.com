import React from 'react';
import { graphql } from 'gatsby';

import Avatar from '../components/avatar';
import Intro from '../components/intro';
import Link from '../components/link';
import Section from '../components/section';
import SEO from '../components/seo';
import Talks from '../components/talks';

export default function SingleSpeakerPage({ data, location }) {
	const {
		talks,
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

					{speaker.title}
				</Intro.Title>

				<Intro.Tagline>
					{speaker?.role || ''}
					{speaker.ministry && speaker.role && (
						<span className="mx-1 text-gray-500">&bull;</span>
					)}
					{speaker?.ministry || ''}
				</Intro.Tagline>
			</Intro>

			<Section>
				<Section.Sidebar sticky>
					{speaker.description && (
						<>
							<Section.Heading as="h2">About</Section.Heading>

							<div
								className="prose"
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
								{speaker.website && (
									<Link to={speaker.website}>{speaker.ministry}</Link>
								)}

								{!speaker.website && <span>{speaker.ministry}</span>}
							</p>
						</>
					)}
				</Section.Sidebar>

				<Section.Content>
					<Talks
						className="grid grid-cols-1 gap-6"
						talks={talks.nodes}
						hideAvatar
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
					data {
						title
					}
				}
			}
		}
		talks: allAirtableTalk(
			filter: { data: { speakers: { elemMatch: { id: { eq: $id } } } } }
			sort: { fields: data___publishedDate, order: DESC }
		) {
			nodes {
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
`;
