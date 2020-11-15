import React from 'react';
import { graphql } from 'gatsby';

import SEO from '../../components/seo';

import Clips from '../../components/clips';
import Section, { Content, Heading, Sidebar } from '../../components/section';

export default function ClipsPage({ data, location }) {
	const { edges: clips = [] } = data.clips;

	return (
		<>
			<SEO title="Clips" location={location} />

			<Section>
				<Sidebar>
					<Heading>Tiny Talks</Heading>
					<div className="prose">
						<p>Be encouraged by these short Christ centered montages.</p>
					</div>
				</Sidebar>

				<Content>
					<Clips className="flex flex-col gap-6" clips={clips} />
				</Content>
			</Section>
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
					fields {
						slug
					}
					data {
						title
						publishedDate(formatString: "YYYYMMDD")
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
