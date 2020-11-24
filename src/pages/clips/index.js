import React from 'react';
import { graphql } from 'gatsby';

import SEO from '../../components/seo';

import Clips from '../../components/clips';
import Section from '../../components/section';

export default function ClipsPage({ data, location }) {
	const { clips } = data;

	return (
		<>
			<SEO title="Clips" location={location} />

			<Section>
				<Section.Sidebar sticky>
					<Section.Heading as="h1">Tiny Talks</Section.Heading>
					<div className="prose">
						<p>Be encouraged by these short Christ centered montages.</p>
					</div>
				</Section.Sidebar>

				<Section.Content>
					<Clips className="grid gap-6" clips={clips.nodes} />
				</Section.Content>
			</Section>
		</>
	);
}

export const query = graphql`
	query {
		clips: allAirtableClip(
			sort: { fields: data___publishedDate, order: DESC }
		) {
			nodes {
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
`;
