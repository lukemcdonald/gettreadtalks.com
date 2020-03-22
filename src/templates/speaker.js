import React from 'react';
import { graphql } from 'gatsby';

import Layout from '../components/layout';
import SEO from '../components/seo';
import Intro from '../components/intro';
import { Container, Section } from '../components/styled/layout';
import Talks from '../components/talks';
import SpeakerNav from '../components/speakers/postNav';

export default props => {
	const { data: post } = props.data.speaker;
	const { edges: talks = [] } = props.data.talks;

	let { description } = post;
	if (description) {
		description = description.childMarkdownRemark;
	}

	return (
		<Layout>
			<SEO
				title={post.title}
				description={description ? description.excerpt : ''}
				pathname={post.path}
			/>

			<Intro title={post.title} excerpt={description ? description.html : ''} />

			<Container className="has-subnav">
				<Section>
					<SpeakerNav data={post} />
				</Section>

				<Section>
					<Talks data={talks} />
				</Section>
			</Container>
		</Layout>
	);
};

export const pageQuery = graphql`
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
			sort: {
				fields: data___publishedDate,
				order: DESC
			}
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
