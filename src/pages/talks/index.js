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
	const { edges: posts = [] } = data.allAirtable;
	const currentPosts = getCurrentPosts( posts );

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
