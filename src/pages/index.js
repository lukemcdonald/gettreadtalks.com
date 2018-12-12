import React from 'react'
import { Link, graphql } from 'gatsby'

import Layout from '../components/layout'
import SEO from '../components/seo'

export default ({data}) => {
	const { edges: posts } = data.allAirtable;

	return (
		<Layout>
			<SEO title="Home" keywords={['treadtalks', 'talks', 'sermons']} />

			{posts.map(({node: { id, fields, data: post }}) => (
				<p id={id} key={id}>
					<Link to={`/talks/${fields.slug}`}>
						{post.title}
					</Link>
				</p>
			))}
		</Layout>
	)
}

export const pageQuery = graphql`
	query {
		allAirtable(
			limit: 5
			filter:{queryName:{eq:"FEATURED_TALKS"}}
		) {
			edges {
				node {
					id
					data {
						title
						link
						scripture
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
