import React from 'react';
import { graphql } from 'gatsby';

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
			<SEO title="Home" keywords={['treadtalks', 'talks', 'sermons']} />

			<Intro
				title="Workout your salvation."
				text="Weekly sermons to elevate your spiritual heartbeat."
				image={require('../assets/images/bg-intro.jpg')}
			/>

			<div className="container has-subnav pb-16 px-4 mx-auto relative">
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
		allAirtable(limit: 5, filter: { queryName: { eq: "PUBLISHED_TALKS" } }) {
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
