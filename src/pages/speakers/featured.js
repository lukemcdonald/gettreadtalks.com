import React from 'react';
import { graphql } from 'gatsby';

import SEO from '../../components/seo';
import Speakers from '../../components/speakers';
import Section from '../../components/section';
import Page from '../../components/page';
import SpeakersFilter from '../../components/speakers/filter';

export default function FeaturedSpeakersPage({ data, location }) {
	const { speakers } = data;

	return (
		<>
			<SEO title="Featured Speakers" location={location} />

			<Section>
				<Section.Sidebar sticky>
					<Page.Title>
						<SpeakersFilter
							speakers={speakers.nodes}
							current={{
								value: '/speakers/featured/',
								label: '★ Speakers',
							}}
						/>
					</Page.Title>

					<div className="mt-2 prose">
						<p>
							Here are <em>{speakers.totalCount}</em> hand picked stewards of
							Gods word to help get you going.
						</p>
					</div>
				</Section.Sidebar>

				<Section.Content align="wide">
					<Speakers className="xl:grid-cols-3" speakers={speakers.nodes} />
				</Section.Content>
			</Section>
		</>
	);
}

export const query = graphql`
	{
		speakers: allAirtableSpeaker(
			filter: { data: { title: { ne: null }, favorite: { eq: true } } }
			sort: { fields: data___lastName, order: ASC }
		) {
			totalCount
			nodes {
				id
				fields {
					slug
				}
				data {
					title
					firstName
					lastName
					role
					website
					avatar {
						localFiles {
							childImageSharp {
								gatsbyImageData(
									width: 128
									placeholder: TRACED_SVG
									layout: CONSTRAINED
								)
							}
						}
					}
					talks {
						id
					}
				}
			}
		}
	}
`;
