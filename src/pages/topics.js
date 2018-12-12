import React from 'react'
import { Link, graphql } from 'gatsby'

import Layout from '../components/layout'
import SEO from '../components/seo'

export default ({data}) => {
	const { edges: posts } = data.allAirtable;

	return (
		<Layout>
			<SEO title="Topics" keywords={['topics']} />

			<ol>
				{posts.map(({node: { id, fields, data: post }}) => (
					<li id={id} key={id}>
						<Link to={`/topics/${fields.slug}`}>
							{post.name}
						</Link>
					</li>
				))}
			</ol>
		</Layout>
	)
}

export const pageQuery = graphql`
	query {
		allAirtable(filter:{
			queryName:{eq:"PUBLISHED_TOPICS"}
		}) {
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
