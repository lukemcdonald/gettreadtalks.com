/**
 * Query local images in src/assets/images folder and return them as a render prop.
 */

import React from 'react';
import { graphql, StaticQuery } from 'gatsby';

export default ({ children }) => (
	<StaticQuery query={imagesQuery}>
		{({ allFile: { edges } }) =>
			children(
				edges.reduce(
					(allImages, edge) => ({
						...allImages,
						[edge.node.name]: edge.node.childImageSharp,
					}),
					{}
				)
			)
		}
	</StaticQuery>
);

const imagesQuery = graphql`
	query {
		allFile(
			filter: {
				extension: { regex: "/jpeg|jpg|png/" }
				sourceInstanceName: { eq: "images" }
			}
		) {
			edges {
				node {
					id
					name
					childImageSharp {
						fluid(maxWidth: 1280) {
							...GatsbyImageSharpFluid_tracedSVG
						}
					}
				}
			}
		}
	}
`;
