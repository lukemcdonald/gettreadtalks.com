import React from 'react';
import { graphql } from 'gatsby';

import SEO from '../../components/seo';
import Series from '../../components/series';
import Section from '../../components/section';

export default function SeriesPage({ data, location }) {
	const { series } = data;

	return (
		<>
			<SEO title="Sermon Series" location={location} />

			<Section>
				<Section.Sidebar sticky>
					<Section.Heading as="h1">Sermon Series</Section.Heading>

					<div className="prose">
						<p>
							Each series includes talks that were given by one or more speakers
							on the same topic or book of the Bible.
						</p>
					</div>
				</Section.Sidebar>

				<Section.Content>
					<Series className="grid gap-6" series={series.nodes} />
				</Section.Content>
			</Section>
		</>
	);
}

export const query = graphql`
	query {
		series: allAirtableSerie(
			filter: { data: { title: { ne: null } } }
			sort: { fields: data___title, order: ASC }
		) {
			nodes {
				id
				fields {
					slug
				}
				data {
					title
					publishedTalksCount
				}
			}
		}
	}
`;
