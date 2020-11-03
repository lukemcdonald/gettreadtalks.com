import React from 'react';
import { graphql } from 'gatsby';

import SEO from '../components/seo';
import Intro from '../components/intro';
import Talks from '../components/talks';
import TopicsNav from '../components/topics/postNav';

export default function SingleTopicPage({ data }) {
	const { data: topic } = data.topic;
	const { edges: talks = [] } = data.talks;

	const { description = `Talks on the topic of ${topic.title}.` } = topic;

	return (
		<>
			<SEO
				title={topic.title}
				description={description}
				pathname={topic.path}
			/>

			<Intro title={topic.title} excerpt={description} />

			<section>
				<div>
					<TopicsNav />
				</div>

				<div>
					<Talks talks={talks} />
				</div>
			</section>
		</>
	);
}

export const query = graphql`
	query($id: String!) {
		topic: airtable(id: { eq: $id }) {
			id
			fields {
				slug
			}
			data {
				title
			}
		}
		talks: allAirtable(
			filter: {
				queryName: { eq: "PUBLISHED_TALKS" }
				data: { topics: { elemMatch: { id: { eq: $id } } } }
			}
			sort: { fields: data___publishedDate, order: DESC }
		) {
			edges {
				node {
					id
					fields {
						slug
					}
					data {
						title
						path
						scripture
						speakers {
							id
							fields {
								slug
							}
							data {
								title
								avatar {
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
		}
	}
`;
