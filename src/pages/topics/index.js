import React from 'react';
import { graphql } from 'gatsby';

import Intro from '../../components/intro';
import SEO from '../../components/seo';
import Topics from '../../components/topics';

export default function TopicsPage({ data }) {
	const { edges: topics = [] } = data.topics;

	return (
		<>
			<SEO
				title="Topics"
				description="A list of topics with published talks."
				keywords={['topics']}
				pathname="/topics/"
			/>

			<Intro title="Topics" />

			<div>
				<section>
					<Topics topics={topics} />
				</section>
			</div>
		</>
	);
}

export const query = graphql`
	query {
		topics: allAirtable(
			filter: { queryName: { eq: "PUBLISHED_TOPICS" } }
			sort: { fields: data___title, order: ASC }
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
