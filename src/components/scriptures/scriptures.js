import React from 'react';
import { graphql, StaticQuery } from 'gatsby';

const query = graphql`
	query {
		scriptures: allAirtableScripture {
			edges {
				node {
					id
					data {
						verse
						content
					}
				}
			}
		}
	}
`;

export default function Scriptures({ children }) {
	return (
		<StaticQuery query={query}>
			{({ scriptures: { edges } }) =>
				children(
					edges.reduce(
						(allScriptures, edge, index) => ({
							...allScriptures,
							[index]: edge.node.data,
						}),
						{}
					)
				)
			}
		</StaticQuery>
	);
}
