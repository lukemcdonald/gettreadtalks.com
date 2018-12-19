import React from 'react';
import { graphql } from 'gatsby';

import Layout from '../layouts';
import SEO from '../components/seo';
import Intro from '../components/intro';
import { Container, Section } from '../components/styled/layout';
import Talks from '../components/talks';
import TopicsNav from '../components/topics/postNav';

export default props => {
	const { data: post } = props.data.airtable;
	const { edges: posts = [] } = props.data.allAirtable;

	const { description = `Talks on the topic of ${post.name}.` } = post;

	return (
		<Layout>
			<SEO title={post.name} description={description} />

			<Intro title={post.name} excerpt={description} />

			<Container>
				<Section>
					<TopicsNav />
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
				name
			}
		}
		allAirtable(
			filter: {
				queryName: { eq: "PUBLISHED_TALKS" }
				data: { topics: { elemMatch: { id: { eq: $id } } } }
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
								name
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
