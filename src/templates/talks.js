import React from 'react';
import { graphql } from 'gatsby';

import Layout from '../components/layout';
import Intro from '../components/intro';
import SEO from '../components/seo';
import Talks from '../components/talks';
import TalksNav from '../components/talks/nav';
import Search from '../components/search/search';
import Pagination from '../components/pagination';

import { Container, Section } from '../components/styled/layout';

export default ({ data, pageContext }) => {
	const { edges: posts = [] } = data.allAirtable;

	return (
		<Layout>
			<SEO
				title="Talks"
				keywords={['talks', 'sermons', 'treadtalks']}
				pathname="/talks/"
			/>

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

				<Section>
					<Pagination pageContext={pageContext} />
				</Section>
			</Container>
		</Layout>
	);
};

export const pageQuery = graphql`
	query($limit: Int!, $skip: Int!) {
		allAirtable(
			limit: $limit
			skip: $skip
			filter: {
				queryName: { eq: "PUBLISHED_TALKS" }
				data: { title: { ne: null } }
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
						publishedDate(formatString:"YYYYMMDD")
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
