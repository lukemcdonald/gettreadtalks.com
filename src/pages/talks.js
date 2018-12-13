import React from 'react';
import { Link, graphql } from 'gatsby';

import Layout from '../layouts';
import Intro from '../components/intro';
import SEO from '../components/seo';
import { Section } from '../components/styled/layout';
import Talks from '../components/talks';
import TalksNav from '../components/talks/nav';

export default ({ data }) => {
	const { edges: posts = [] } = data.allAirtable;

	return (
		<Layout>
			<SEO title="Talks" keywords={['talks', 'sermons', 'treadtalks']} />

			<Intro
				title="Talks"
				text="Weekly sermons to elevate your spiritual heartbeat."
			/>

			<div className="container has-subnav mx-auto pb-16 px-4 relative">
				<Section>
					<TalksNav />
				</Section>

				<Section>
					<Talks data={posts} />
				</Section>
			</div>
		</Layout>
	);
};

export const pageQuery = graphql`
	query {
		allAirtable(
			limit: 100
			filter: { queryName: { eq: "PUBLISHED_TALKS" } }
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
