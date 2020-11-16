import React from 'react';
import { graphql } from 'gatsby';

import SEO from '../../components/seo';
import Topics from '../../components/topics';
import Section, { Content, Heading, Sidebar } from '../../components/section';

export default function TopicsPage({ data, location }) {
	const { topics } = data;

	return (
		<>
			<SEO
				title="Topics"
				description="A list of topics with published talks."
				location={location}
			/>

			<Section>
				<Sidebar>
					<Heading>Topics</Heading>
					<div className="prose">
						<p>Listen to talks on one of these great topics.</p>
					</div>
				</Sidebar>
				<Content>
					<Topics className="grid grid-cols-1 gap-6" topics={topics.nodes} />
				</Content>
			</Section>
		</>
	);
}

export const query = graphql`
	query {
		topics: allAirtableTopic(sort: { fields: data___title, order: ASC }) {
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
