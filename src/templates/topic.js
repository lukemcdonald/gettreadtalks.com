import React from 'react';
import { graphql } from 'gatsby';

import SEO from '../components/seo';
import Talks from '../components/talks';
import Section, { Content, Heading, Sidebar } from '../components/section';

export default function SingleTopicPage({ data, location }) {
	const {
		talks,
		topic: { data: topic },
	} = data;

	const description = `Talks on the topic of ${topic.title}.`;

	return (
		<>
			<SEO title={topic.title} description={description} location={location} />

			<Section>
				<Sidebar>
					<Heading>{topic.title}</Heading>
					<div className="prose">{description}</div>
				</Sidebar>
				<Content>
					<Talks className="grid grid-cols-1 gap-6" talks={talks.nodes} />
				</Content>
			</Section>
		</>
	);
}

export const query = graphql`
	query($id: String!) {
		topic: airtableTopic(id: { eq: $id }) {
			id
			fields {
				slug
			}
			data {
				title
			}
		}
		talks: allAirtableTalk(
			filter: { data: { topics: { elemMatch: { id: { eq: $id } } } } }
			sort: { fields: data___publishedDate, order: DESC }
		) {
			nodes {
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
`;
