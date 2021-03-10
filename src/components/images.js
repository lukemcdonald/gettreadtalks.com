/**
 * Query local images in src/assets/images folder and return them as a render prop.
 */

import React from 'react';
import { graphql, StaticQuery } from 'gatsby';

const imagesQuery = graphql`
	{
		images: allFile(
			filter: {
				extension: { regex: "/jpeg|jpg|png/" }
				sourceInstanceName: { eq: "images" }
			}
		) {
			nodes {
				id
				name
				childImageSharp {
					gatsbyImageData(placeholder: TRACED_SVG, layout: FULL_WIDTH)
				}
			}
		}
	}
`;

export default function Images({ children }) {
	return (
		<StaticQuery query={imagesQuery}>
			{({ images: { nodes } }) =>
				children(
					nodes.reduce(
						(allImages, node) => ({
							...allImages,
							[node.name]: node.childImageSharp,
						}),
						{}
					)
				)
			}
		</StaticQuery>
	);
}
