import React from 'react';
import { graphql } from 'gatsby';

import Layout from '../layouts';
import Intro from '../components/intro';
import SEO from '../components/seo';
import { Container, Section } from '../components/styled/layout';
import Talks from '../components/talks';
import TalksNav from '../components/talks/nav';
import Search from '../components/search';

export default ({ data }) => {
	const { edges: posts } = data.allAirtable;

	return (
		<Layout>
			<SEO
				title="Featured Talks"
				keywords={['featured', 'talks', 'sermons', 'treadtalks']}
			/>

			<Intro
				title="Featured Talks"
				excerpt="Staff picked talks to elevate your spiritual heartbeat."
			>
				<Search />
			</Intro>

			<Container className="has-subnav">
				<Section>
					<TalksNav />
				</Section>

				<Section>
					<Talks data={posts} />
				</Section>
			</Container>
		</Layout>
	);
};

export const pageQuery = graphql`
	query {
		allAirtable(
			filter: {
				queryName: { eq: "PUBLISHED_TALKS" }
				data: { favorite: { eq: true } }
			}
			sort: { fields: data___publishedDate, order: DESC }
		) {
			edges {
				node {
					id
					data {
						title
						link
						scripture
						favorite
						speakers {
							id
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
							fields {
								slug
							}
						}
					}
					fields {
						slug
					}
				}
			}
		}
	}
`;
