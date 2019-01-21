import React from 'react';
import { graphql } from 'gatsby';

import Layout from '../components/layout';
import Intro from '../components/intro';
import SEO from '../components/seo';
import { Container, Section } from '../components/styled/layout';
import Talks from '../components/talks';
import TalksNav from '../components/talks/nav';
import Search from '../components/search/search';

export default ({ data }) => {
	const { edges: posts = [] } = data.allAirtable;

	return (
		<Layout>
			<SEO
				title="Weekly sermons to elevate your spiritual heartbeat."
				keywords={['treadtalks', 'talks', 'sermons']}
			/>

			<Intro
				title="Workout your salvation."
				excerpt="Weekly sermons to elevate your spiritual heartbeat."
				image={{ name: 'bg-intro' }}
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
			limit: 5
			filter: {
				queryName: { eq: "PUBLISHED_TALKS" }
				data: { title: { ne: null } }
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
						speakers {
							id
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
