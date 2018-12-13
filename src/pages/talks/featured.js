import React from 'react';
import { Link, graphql } from 'gatsby';

import Layout from '../../layouts';
import SEO from '../../components/seo';

export default ({ data }) => {
	const { edges: posts } = data.allAirtable;

	return (
		<Layout>
			<SEO
				title="Featured Talks"
				keywords={['talks', 'sermons', 'treadtalks']}
			/>

			<ol>
				{posts.map(({ node: { id, fields, data: post } }) => (
					<li key={id} id={id}>
						<Link to={`/talks/${fields.slug}`}>{post.title}</Link>
					</li>
				))}
			</ol>
		</Layout>
	);
};

export const pageQuery = graphql`
	query {
		allAirtable(
			filter: {
				queryName: { eq: "PUBLISHED_TALKS" }
				data: { favorite: { eq: true } }
			}
			sort: { fields: data___publishedDate, order: DESC }
		) {
			edges {
				node {
					id
					data {
						title
						link
						scripture
						favorite
						speakers {
							id
							data {
								name
							}
						}
					}
					fields {
						slug
					}
				}
			}
		}
	}
`;
