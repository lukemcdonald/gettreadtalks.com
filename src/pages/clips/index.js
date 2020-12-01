import React from 'react';
import { graphql } from 'gatsby';

import SEO from '../../components/seo';

import Clips from '../../components/clips';
import Section from '../../components/section';
import Page from '../../components/page';
import RandomProduct from '../../components/affiliates/randomProduct';

export default function ClipsPage({ data, location }) {
	const { clips } = data;

	return (
		<>
			<SEO title="Clips" location={location} />

			<Section>
				<Section.Sidebar sticky>
					<Section.Heading>Clips</Section.Heading>
					<Page.Title>Tiny Talks</Page.Title>
					<div className="mt-2 prose">
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
