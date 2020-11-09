import React from 'react';
import { graphql } from 'gatsby';

import Intro from '../../components/intro';
import SEO from '../../components/seo';

import Clips from '../../components/clips';

export default function ClipsPage({ data, location }) {
	const { edges: clips = [] } = data.clips;

	return (
		<>
			<SEO title="Clips" location={location} />

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
		clips: allAirtableClip(
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
