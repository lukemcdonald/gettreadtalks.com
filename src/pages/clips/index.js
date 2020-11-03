import React from 'react';
import { graphql } from 'gatsby';

import Intro from '../../components/intro';
import SEO from '../../components/seo';

import Clips from '../../components/clips';

export default function ClipsPage({ data }) {
	const { edges: clips = [] } = data.clips;

	return (
		<>
			<SEO
				title="Clips"
				keywords={['clips', 'talks', 'sermons', 'treadtalks']}
				pathname="/clips/"
			/>

			<Intro
				title="Tiny Talks"
				excerpt="Be encouraged by these shorter Christ centered montages."
			/>

			<section>
				<div>
					<Clips clips={clips} />
				</div>
			</section>
		</>
	);
}

export const query = graphql`
	query {
		clips: allAirtable(
			filter: { queryName: { eq: "PUBLISHED_CLIPS" } }
			sort: { fields: data___publishedDate, order: DESC }
		) {
			edges {
				node {
					id
					data {
						title
						publishedDate(formatString: "YYYYMMDD")
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
