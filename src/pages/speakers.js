import React from 'react';
import { Link, graphql } from 'gatsby';

import Layout from '../layouts';
import Intro from '../components/intro';
import SEO from '../components/seo';

export default ({ data }) => {
	const { edges: posts = [] } = data.allAirtable;

	return (
		<Layout>
			<SEO title="Speakers" keywords={['speakers', 'pastors', 'evangelists']} />

			<Intro title="Speakers" />

			<ol>
				{posts.map(({ node: { id, fields, data: post } }) => (
					<li key={id} id={id}>
						<Link to={`/speakers/${fields.slug}`}>{post.name}</Link>
					</li>
				))}
			</ol>
		</Layout>
	);
};

export const pageQuery = graphql`
	query {
		allAirtable(
			filter: { queryName: { eq: "PUBLISHED_SPEAKERS" } }
			sort: { fields: data___lastName, order: ASC }
		) {
			edges {
				node {
					id
					data {
						name
						firstName
						lastName
						role
						ministry
						website
					}
					fields {
						slug
					}
				}
			}
		}
	}
`;
