import React from 'react';
import { graphql } from 'gatsby';

import Layout from '../../components/layout';
import Intro from '../../components/intro';
import SEO from '../../components/seo';
import { Container, Section } from '../../components/styled/layout';
import Series from '../../components/series';

export default ({ data }) => {
	const { edges: posts = [] } = data.allAirtable;

	return (
		<Layout>
			<SEO
				title="Sermon Series"
				keywords={['series', 'talks', 'group']}
				pathname="/series/"
			/>

			<Intro title="Sermon Series" />

			<Container>
				<Section>
					<Series data={posts} />
				</Section>
			</Container>
		</Layout>
	);
};

export const pageQuery = graphql`
	query {
		allAirtable(
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
