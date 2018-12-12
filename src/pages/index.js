import React from 'react'
import { Link, graphql } from 'gatsby'

import Layout from '../components/layout'
import SEO from '../components/seo'

const IndexPage = (props) => {

	console.log(props);

	return (
		<Layout>
			<SEO title="Home" keywords={['gatsby', 'application', 'react']} />
			{props.data.allAirtable.edges.map(edge => (
				<p key={edge.node.data.title}>
					{edge.node.data.title}
				</p>
			))}
		</Layout>
	)
}

export default IndexPage;

export const pageQuery = graphql`
	query {
		allAirtable(filter:{
			queryName:{eq:"FEATURED_TALKS"}
		}) {
			edges {
				node {
					data {
						title
						favorite
						topics {
							data {
								name
								talks {
									data {
										title
									}
								}
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
