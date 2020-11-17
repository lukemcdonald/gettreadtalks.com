import React from 'react';
import { graphql } from 'gatsby';

import SEO from '../../components/seo';
import Talks from '../../components/talks';
// import Pagination from '../../components/pagination';
import Section from '../../components/section';
import TopicsNav from '../../components/topics/nav';
import Link from '../../components/link';

export default function TalksPage({ data, location, pageContext }) {
	const { talks, topics } = data;

	return (
		<>
			<SEO title="Talks" location={location} />

			<Section>
				<Section.Sidebar>
					<Section.Heading as="h1">Talks</Section.Heading>

					<div className="mb-8 prose">
						<p>
							Christ centered sermons that will elevate your spiritual
							heartbeat.
						</p>
					</div>

					<Section.Heading as="h2">Topics</Section.Heading>
					<TopicsNav topics={topics.nodes} />
				</Section.Sidebar>

				<Section.Content>
					<Talks className="grid grid-cols-1 gap-6" talks={talks.nodes} />
					{/* <Pagination pageContext={pageContext} /> */}
				</Section.Content>

				<Section.Sidebar right>
					<Link className="font-medium" to="/talks/featured/">
						Featured Talks &rarr;
					</Link>
				</Section.Sidebar>
			</Section>
		</>
	);
}

export const query = graphql`
	query($topic: [String]) {
		talks: allAirtableTalk(
			filter: {
				data: {
					publishedDate: { ne: null }
					topics: { elemMatch: { data: { title: { in: $topic } } } }
				}
			}
			sort: { fields: data___publishedDate, order: DESC }
		) {
			nodes {
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
		topics: allAirtableTopic(sort: { fields: data___title, order: ASC }) {
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
`;
