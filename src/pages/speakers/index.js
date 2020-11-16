import React from 'react';
import { graphql } from 'gatsby';

import Intro from '../../components/intro';
import SEO from '../../components/seo';
import Speakers from '../../components/speakers';
import Section, { Content, Heading, Sidebar } from '../../components/section';

export default function SpeakersPage({ data, location }) {
	const { edges: speakers = [] } = data.speakers;

	return (
		<>
			<SEO title="Speakers" location={location} />

			<Section>
				<Sidebar>
					<Heading>Speakers</Heading>
					<div className="prose">
						<p>
							Here you will find an archive of faithful ambassadors of Christ.
							Choose a speaker to view their available talks.
						</p>

						<p>Speakers are listed in alphabetical order by last name.</p>
					</div>
				</Sidebar>
				<Content>
					<Speakers className="grid grid-cols-1 gap-6" speakers={speakers} />
				</Content>
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
