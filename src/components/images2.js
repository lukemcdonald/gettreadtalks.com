import React from 'react';
import { StaticQuery, graphql } from 'gatsby';

function Images({ children }) {
	return (
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
}

export default Images;

const imagesQuery = graphql`
	query ImagesQuery {
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
						fluid(maxWidth: 1440) {
							...GatsbyImageSharpFluid_tracedSVG
						}
					}
				}
			}
		}
	}
`;
