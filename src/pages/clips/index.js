import React from 'react';
import { graphql } from 'gatsby';

import Layout from '../../components/layout';
import Intro from '../../components/intro';
import SEO from '../../components/seo';
import { Container, Section } from '../../components/styled/layout';

import Clips from '../../components/clips';

export default ({ data }) => {
	const { edges: posts = [] } = data.allAirtable;

	return (
		<Layout>
			<SEO
				title="Clips"
				keywords={['clips', 'talks', 'sermons', 'treadtalks']}
				pathname="/clips/"
			/>

			<Intro
				title="Tiny Talks"
				excerpt="Be encouraged by these shorter Christ centered montages."
			/>

			<Container className="has-subnav">
				<Section>
					<Clips data={posts} />
				</Section>
			</Container>
		</Layout>
	);
};

export const pageQuery = graphql`
	query {
		allAirtable(
			filter: {
				queryName: { eq: "PUBLISHED_CLIPS" }
			}
			sort: { fields: data___publishedDate, order: DESC }
		) {
			edges {
				node {
					id
					data {
						title
						publishedDate(formatString:"YYYYMMDD")
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
