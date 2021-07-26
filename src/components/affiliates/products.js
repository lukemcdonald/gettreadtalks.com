import React from 'react'
import { graphql, StaticQuery } from 'gatsby'

const query = graphql`
	{
		affiliates: allAirtableAffiliateLink(
			filter: { data: { title: { ne: null } } }
			sort: { fields: data___type, order: ASC }
		) {
			nodes {
				id
				data {
					title
					subtitle
					link {
						childMarkdownRemark {
							rawMarkdownBody
						}
					}
					affiliate
					type
					productId
					description {
						childMarkdownRemark {
							excerpt
							html
						}
					}
					image {
						localFiles {
							childImageSharp {
								gatsbyImageData(
									width: 128
									placeholder: TRACED_SVG
									layout: CONSTRAINED
								)
							}
						}
					}
				}
			}
		}
	}
`

function Products({ children }) {
	return (
		<StaticQuery query={query}>
			{({ affiliates: { nodes } }) =>
				children(
					nodes.reduce(
						(allLinks, node, index) => ({
							...allLinks,
							[index]: node.data,
						}),
						{}
					)
				)
			}
		</StaticQuery>
	)
}

export { Products }
