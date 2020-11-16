import React from 'react';
import { graphql } from 'gatsby';

import SEO from '../components/seo';
import Intro from '../components/intro';
import Talks from '../components/talks';
import Section, { Content, Heading, Sidebar } from '../components/section';
import Link, { Button } from '../components/link';
import { Avatar } from '../components/card';

export default function SingleSpeakerPage({ data, location }) {
	const {
		talks,
		speaker: { data: speaker },
	} = data;

	const speakerImage = `
    <img
      class="w-24 shadow-lg rounded-full block m-auto mb-4"
      src="${speaker.avatar.localFiles[0].childImageSharp.fluid.src}"
      alt="${speaker.title}"
    />`;

	console.log(speaker.avatar);

	return (
		<>
			<SEO
				title={speaker.title}
				description={speaker.description?.childMarkdownRemark.excerpt}
				image={speaker.avatar?.localFiles?.[0]?.publicURL}
				location={location}
			/>

			<Intro
				title={`${speakerImage} ${speaker.title}`}
				excerpt={`${speaker?.role ? speaker.role : ''} ${
					speaker.ministry && speaker.role
						? `<span class="text-gray-500">&bull;</span>`
						: ''
				}
            ${speaker?.ministry ? speaker.ministry : ''}
				`}
				image={speaker?.banner}
			/>

			<Section>
				<Sidebar>
					<Heading as="h2">About</Heading>
					<div
						className="prose"
						dangerouslySetInnerHTML={{
							__html: speaker.description?.childMarkdownRemark.html,
						}}
					/>

					{speaker.ministry && (
						<>
							<Heading as="h3" className="mt-8">
								Ministry
							</Heading>

							<p className="prose">
								{speaker.website && (
									<Link to={speaker.website}>{speaker.ministry}</Link>
								)}

								{!speaker.website && <span>{speaker.ministry}</span>}
							</p>
						</>
					)}
				</Sidebar>

				<Content>
					<Talks
						className="grid grid-cols-1 gap-6"
						talks={talks.nodes}
						hideAvatar
					/>
				</Content>
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
