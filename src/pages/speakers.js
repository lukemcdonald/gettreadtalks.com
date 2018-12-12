import React from 'react'
import { Link, graphql } from 'gatsby'

import Layout from '../components/layout'
import SEO from '../components/seo'

export default ({data}) => {
	const { edges: posts } = data.allAirtable;

	return (
		<Layout>
			<SEO title="Speakers" keywords={['speakers', 'pastors', 'evangelists']} />

			{posts.map(({node: { id, fields, data: post }}) => (
				<p id={id} key={id}>
					<Link to={`/speakers/${fields.slug}`}>
						{post.name}
					</Link>
				</p>
			))}
		</Layout>
	)
}

export const pageQuery = graphql`
	query {
		allAirtable(filter:{
			queryName:{eq:"PUBLISHED_SPEAKERS"}
		}) {
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
