import React from 'react';
import { graphql } from 'gatsby';

import Clips from '../../components/clips';
import Page from '../../components/page';
import Section from '../../components/section';
import SEO from '../../components/seo';

export default function ClipsPage({ data, location }) {
	const { clips } = data;

	return (
		<>
			<SEO title="Clips" location={location} />

			<Section>
				<Section.Sidebar sticky>
					<Page.Title>Clips</Page.Title>
					<div className="mt-2 prose">
						<p>Be encouraged by these short Christ centered clips.</p>
					</div>
				</Section.Sidebar>

				<Section.Content>
					<Clips clips={clips.nodes} />
				</Section.Content>
			</Section>
		</>
	);
}

export const query = graphql`
	query {
		clips: allAirtableClip {
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
