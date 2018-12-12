import React from 'react'
import { Link, graphql } from 'gatsby'

import Layout from '../components/layout'
import SEO from '../components/seo'

export default ({data}) => {
	const posts = data.allAirtable.edges;

	return (
		<Layout>
			<SEO title="Talks" keywords={['talks', 'sermons', 'treadtalks']} />

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
		allAirtable(filter:{
			queryName:{eq:"PUBLISHED_TALKS"}
		}) {
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
