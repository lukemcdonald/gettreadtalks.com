import React from 'react';
import { graphql } from 'gatsby';

import SEO from '../components/seo';
import Intro from '../components/intro';
import Talks from '../components/talks';
import Section, { Content, Heading, Sidebar } from '../components/section';
import { Button } from '../components/link';

export default function SingleSpeakerPage({ data, location }) {
	const { data: speaker } = data.speaker;
	const { edges: talks = [] } = data.talks;

	return (
		<>
			<SEO
				title={speaker.title}
				description={speaker.description?.childMarkdownRemark.excerpt}
				image={speaker.avatar?.localFiles?.[0]?.publicURL}
				location={location}
			/>

			<Intro
				title={speaker.title}
				excerpt={`${speaker.role} ${
					speaker.ministry && speaker.role
						? `<span class="text-gray-500">&bull;</span>`
						: ''
				}
            ${speaker.ministry}
				`}
				image={speaker?.banner}
			/>

			<Section>
				<Sidebar>
					<Heading as="h2">About</Heading>
					<div
						dangerouslySetInnerHTML={{
							__html: speaker.description?.childMarkdownRemark.html,
						}}
					/>

					{speaker.ministry && (
						<p className="mt-6">
							{speaker.website && (
								<Button to={speaker.website}>{speaker.ministry}</Button>
							)}

							{!speaker.website && <span>{speaker.ministry}</span>}
						</p>
					)}
				</Sidebar>

				<Content>
					<Talks className="flex flex-col gap-6" talks={talks} />
				</Content>
			</Section>
		</>
	);
}

export const query = graphql`
	query($id: String!) {
		speaker: airtableSpeaker(id: { eq: $id }) {
			id
			fields {
				slug
			}
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
			edges {
				node {
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
	}
`;
