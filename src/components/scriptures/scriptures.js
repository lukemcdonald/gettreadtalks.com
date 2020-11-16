import React from 'react';
import { graphql, StaticQuery } from 'gatsby';

const query = graphql`
	query {
		scriptures: allAirtableScripture {
			nodes {
				id
				data {
					verse
					content
				}
			}
		}
	}
`;

export default function Scriptures({ children }) {
	return (
		<StaticQuery query={query}>
			{({ scriptures: { nodes } }) =>
				children(
					nodes.reduce(
						(allScriptures, node, index) => ({
							...allScriptures,
							[index]: node.data,
						}),
						{}
					)
				)
			}
		</StaticQuery>
	);
}
