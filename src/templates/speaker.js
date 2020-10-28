import React from 'react';
import { graphql } from 'gatsby';

import SEO from '../components/seo';
import Intro from '../components/intro';
import Talks from '../components/talks';
import SpeakerNav from '../components/speakers/postNav';

export default function SingleSpeakerPage({ data }) {
	const { data: speaker } = data.speaker;
	const { edges: talks = [] } = data.talks;
	let { description } = speaker;

	if (description) {
		description = description.childMarkdownRemark;
	}

	return (
		<>
			<SEO
				title={speaker.title}
				description={description ? description.excerpt : ''}
				pathname={speaker.path}
			/>

			<Intro
				title={speaker.title}
				excerpt={description ? description.html : ''}
			/>

			<div className="has-subnav">
				<section>
					<SpeakerNav data={speaker} />
				</section>

				<section>
					<Talks talks={talks} />
				</section>
			</div>
		</>
	);
}

export const query = graphql`
	query($id: String!) {
		speaker: airtable(id: { eq: $id }) {
			id
			fields {
				slug
			}
			data {
				title
				ministry
				website
				description {
					childMarkdownRemark {
						excerpt
						html
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
			}
		}
		talks: allAirtable(
			filter: {
				queryName: { eq: "PUBLISHED_TALKS" }
				data: { speakers: { elemMatch: { id: { eq: $id } } } }
			}
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
