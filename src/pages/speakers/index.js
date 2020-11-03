import React from 'react';
import { graphql } from 'gatsby';

import Intro from '../../components/intro';
import SEO from '../../components/seo';
import Speakers from '../../components/speakers';

export default function SpeakersPage({ data }) {
	const { edges: speakers = [] } = data.speakers;

	return (
		<>
			<SEO
				title="Speakers"
				keywords={['speakers', 'pastors', 'evangelists']}
				pathname="/speakers/"
			/>

			<Intro title="Speakers" />

			<section>
				<div>
					<Speakers speakers={speakers} />
				</div>
			</section>
		</>
	);
}

export const pageQuery = graphql`
	query {
		speakers: allAirtable(
			filter: {
				queryName: { eq: "PUBLISHED_SPEAKERS" }
				data: { title: { ne: null } }
			}
			sort: { fields: data___lastName, order: ASC }
		) {
			edges {
				node {
					id
					fields {
						slug
					}
					data {
						title
						role
						ministry
						website
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
`;
