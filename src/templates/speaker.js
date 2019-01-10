import React from 'react';
import { graphql } from 'gatsby';

import Layout from '../components/layout';
import SEO from '../components/seo';
import Intro from '../components/intro';
import { Container, Section } from '../components/styled/layout';
import Talks from '../components/talks';
import SpeakerNav from '../components/speakers/postNav';

export default props => {
	const { data: post } = props.data.airtable;
	const { edges: posts = [] } = props.data.allAirtable;
	const description = post.description.childMarkdownRemark;

	return (
		<Layout>
			<SEO title={post.title} description={description.excerpt} />

			<Intro
				title={post.title}
				excerpt={description.html}
				image={post.banner}
			/>

			<Container className="has-subnav">
				<Section>
					<SpeakerNav data={post} />
				</Section>

				<Section>
					<Talks data={posts} />
				</Section>
			</Container>
		</Layout>
	);
};

export const pageQuery = graphql`
	query($id: String!) {
		airtable(id: { eq: $id }) {
			id
			fields {
				slug
			}
			data {
				title
				ministry
				website
				banner {
					localFiles {
						childImageSharp {
							fluid(maxWidth: 1440) {
								...GatsbyImageSharpFluid_tracedSVG
							}
						}
					}
				}
				description {
					childMarkdownRemark {
						excerpt
						html
					}
				}
			}
		}
		allAirtable(
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
						link
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
