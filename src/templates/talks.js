import React from 'react';
import { graphql } from 'gatsby';

import SEO from '../components/seo';
import Talks from '../components/talks';
import Pagination from '../components/pagination';
import Section, { Content, Heading, Sidebar } from '../components/section';
import TopicNav from '../components/topics/topicNav';

export default function ArchiveTalksPage({ data, location, pageContext }) {
	const { edges: talks = [] } = data.talks;
	const { edges: topics = [] } = data.topics;

	return (
		<>
			<SEO title="Talks" location={location} />

			<Section>
				<Sidebar>
					<Heading>Talks</Heading>
					<div className="prose">
						<p>
							Christ centered sermons that will elevate your spiritual
							heartbeat.
						</p>
					</div>
				</Sidebar>

				<Content>
					<Talks className="grid grid-cols-1 gap-6" talks={talks} />
					<Pagination pageContext={pageContext} />
				</Content>

				<Sidebar>
					<Heading>Topics</Heading>
					<TopicNav topics={topics} />
				</Sidebar>
			</Section>
		</>
	);
}

export const query = graphql`
	query($limit: Int!, $skip: Int!) {
		talks: allAirtableTalk(
			limit: $limit
			skip: $skip
			filter: { data: { publishedDate: { ne: null } } }
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
						publishedDate(formatString: "YYYYMMDD")
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
		topics: allAirtableTopic(sort: { fields: data___title, order: ASC }) {
			edges {
				node {
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
	}
`;
