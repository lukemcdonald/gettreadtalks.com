import React from 'react';
import { graphql } from 'gatsby';
import { getCurrentPosts } from "../../utils";

import Layout from '../../components/layout';
import Intro from '../../components/intro';
import SEO from '../../components/seo';
import { Container, Section } from '../../components/styled/layout';
import Talks from '../../components/talks';
import TalksNav from '../../components/talks/nav';
import Search from '../../components/search/search';

export default ({ data }) => {
	const { edges: posts } = data.allAirtable;
	const currentPosts = getCurrentPosts( posts );

	return (
		<Layout>
			<SEO
				title="Featured Talks"
				keywords={['featured', 'talks', 'sermons', 'treadtalks']}
				pathname="/talks/featured/"
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
					<Talks data={currentPosts} />
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
				data: {
					favorite: { eq: true }
				}
			}
			sort: { fields: data___publishedDate, order: DESC }
		) {
			edges {
				node {
					id
					data {
						title
						publishedDate(formatString:"YYYYMMDD")
						scripture
						favorite
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
