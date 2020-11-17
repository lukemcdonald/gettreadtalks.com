import React from 'react';
import { graphql } from 'gatsby';

import SEO from '../../components/seo';
import Speakers from '../../components/speakers';
import Section from '../../components/section';

export default function SpeakersPage({ data, location }) {
	const { speakers } = data;

	return (
		<>
			<SEO title="Speakers" location={location} />

			<Section>
				<Section.Sidebar>
					<Section.Heading as="h1">Speakers</Section.Heading>

					<div className="prose">
						<p>
							Choose from one of these faithful ambassadors of Christ to view
							their available talks.
						</p>

						<p>Speakers are listed in alphabetical order by last name.</p>
					</div>
				</Section.Sidebar>

				<Section.Content>
					<Speakers
						className="grid grid-cols-1 gap-6"
						speakers={speakers.nodes}
					/>
				</Section.Content>
			</Section>
		</>
	);
}

export const pageQuery = graphql`
	query {
		speakers: allAirtableSpeaker(
			filter: { data: { title: { ne: null } } }
			sort: { fields: data___lastName, order: ASC }
		) {
			nodes {
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
`;
