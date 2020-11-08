import React from 'react';
import { graphql, StaticQuery } from 'gatsby';

const query = graphql`
	query {
		affiliates: allAirtableAffiliateLink(
			filter: { data: { title: { ne: null } } }
			sort: { fields: data___type, order: ASC }
		) {
			edges {
				node {
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
									fluid(maxWidth: 128) {
										...GatsbyImageSharpFluid_tracedSVG
									}
								}
							}
						}
					}
				}
			}
		}
	}
`;

export default function Products({ children }) {
	return (
		<StaticQuery query={query}>
			{({ affiliates: { edges } }) =>
				children(
					edges.reduce(
						(allLinks, edge, index) => ({
							...allLinks,
							[index]: edge.node.data,
						}),
						{}
					)
				)
			}
		</StaticQuery>
	);
}
