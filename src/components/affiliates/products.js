/**
 * Query local images in src/assets/images folder and return them as a render prop.
 */

import React from 'react';
import { graphql, StaticQuery } from 'gatsby';

export default ({ children }) => (
	<StaticQuery query={affiliateLinksQuery}>
		{({ allAirtable: { edges } }) =>
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

const affiliateLinksQuery = graphql`
	query {
		allAirtable(
			filter: {
				queryName: { eq: "PUBLISHED_AFFILIATE_LINKS" }
				data: { title: { ne: null } }
			}
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
