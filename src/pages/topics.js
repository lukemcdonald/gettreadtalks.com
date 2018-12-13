import React from 'react';
import { Link, graphql } from 'gatsby';

import Layout from '../layouts';
import SEO from '../components/seo';

export default ({ data }) => {
	const { edges: posts = [] } = data.allAirtable;

	return (
		<Layout>
			<SEO title="Topics" keywords={['topics']} />

			<ol>
				{posts.map(({ node: { id, fields, data: post } }) => (
					<li key={id} id={id}>
						<Link to={`/topics/${fields.slug}`}>{post.name}</Link>
					</li>
				))}
			</ol>
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
					data {
						name
						publishedTalksCount
					}
					fields {
						slug
					}
				}
			}
		}
	}
`;
