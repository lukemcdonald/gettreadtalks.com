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
	const { edges: posts = [] } = data.allAirtable;

	return (
		<Layout>
			<SEO title="Talks" keywords={['talks', 'sermons', 'treadtalks']} />

			<Intro
				title="Talks"
				excerpt="Weekly sermons to elevate your spiritual heartbeat."
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
			filter: { queryName: { eq: "PUBLISHED_TALKS" } }
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
