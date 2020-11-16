import React from 'react';
import { graphql, useStaticQuery } from 'gatsby';

function countTalksInTopics(talks) {
	console.clear();
	return talks.map((talk) => {
		console.log(talk.data);
		return talk;
	});
}

export default function TopicsFilter() {
	const { talks, topics } = useStaticQuery(graphql`
		query {
			talks: allAirtableTalk {
				nodes {
					id
					fields {
						slug
					}
					data {
						topics {
							id
							data {
								title
							}
						}
					}
				}
			}
			topics: allAirtableTopic {
				nodes {
					id
					fields {
						slug
					}
					data {
						title
						publishedTalksCount
					}
				}
			}
		}
	`);

	// console.clear();
	// console.clear();
	const talksWithTopics = countTalksInTopics(talks.nodes);
	// console.log(talksWithTopics);

	return (
		<div>
			<p>Topics Filter</p>
		</div>
	);
}
