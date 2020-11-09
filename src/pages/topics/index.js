import React from 'react';
import { graphql } from 'gatsby';

import SEO from '../../components/seo';
import Topics from '../../components/topics';
import Section, { Content } from '../../components/section';

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

			<Section>
				<Content>
					<header className="prose prose-lg">
						<h1 className="text-4xl font-bold text-gray-900">Topics</h1>
						<span />
					</header>
					<Topics className="flex flex-col gap-6" topics={topics} />
				</Content>
			</Section>
		</>
	);
}

export const query = graphql`
	query {
		topics: allAirtableTopic(sort: { fields: data___title, order: ASC }) {
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
