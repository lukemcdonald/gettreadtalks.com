import React from 'react';
import { graphql } from 'gatsby';

import Layout from '../../layouts';
import Intro from '../../components/intro';
import SEO from '../../components/seo';
import { Container, Section } from '../../components/styled/layout';
import Topics from '../../components/topics';

export default ({ data }) => {
	const { edges: posts = [] } = data.allAirtable;

	return (
		<Layout>
			<SEO
				title="Topics"
				description="A list of topics with published talks."
				keywords={['topics']}
			/>

			<Intro title="Topics" />

			<Container>
				<Section>
					<Topics data={posts} />
				</Section>
			</Container>
		</Layout>
	);
};

export const pageQuery = graphql`
	query {
		allAirtable(
			filter: { queryName: { eq: "PUBLISHED_TOPICS" } }
			sort: { fields: data___name, order: ASC }
		) {
			edges {
				node {
					id
					fields {
						slug
					}
					data {
						name
						publishedTalksCount
					}
				}
			}
		}
	}
`;
