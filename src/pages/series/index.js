import React from 'react';
import { graphql } from 'gatsby';

import Intro from '../../components/intro';
import SEO from '../../components/seo';
import Series from '../../components/series';

export default function SeriesPage({ data }) {
	const { edges: series = [] } = data.series;

	return (
		<>
			<SEO
				title="Sermon Series"
				keywords={['series', 'talks', 'group']}
				pathname="/series/"
			/>

			<Intro title="Sermon Series" />

			<section>
				<div>
					<Series series={series} />
				</div>
			</section>
		</>
	);
}

export const query = graphql`
	query {
		series: allAirtable(
			filter: {
				queryName: { eq: "PUBLISHED_SERIES" }
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
						publishedTalksCount
					}
				}
			}
		}
	}
`;
