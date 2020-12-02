import React from 'react';
import { graphql } from 'gatsby';
import { maybePluralize } from '../../utilities';

import Page from '../../components/page';
import Section from '../../components/section';
import SEO from '../../components/seo';
import Talks from '../../components/talks';
import TalksFilter from '../../components/talks/filter';

export default function TalksPage({ data, location, pageContext }) {
	const { talks, topics } = data;
	const isTopical = topics?.nodes && pageContext?.topic;
	console.log(isTopical ? 'topical' : 'nope');
	const description = `Elevate your spiritual heartbeat with ${maybePluralize(
		talks.totalCount,
		'Christ centered talk',
		{
			formatSmallNumbers: true,
		}
	)}${isTopical ? ` on ${pageContext.topic}` : ''}.`;

	return (
		<>
			<SEO title="Talks" description={description} location={location} />

			<Section>
				<Section.Sidebar>
					{isTopical && <Section.Heading as="h2">Talks On</Section.Heading>}

					<Page.Title>
						<TalksFilter
							topics={topics.nodes}
							current={{
								value: pageContext.slug,
								label: pageContext.topic,
							}}
						/>
					</Page.Title>

					<div className="mt-2 prose">
						<p>{description}</p>
					</div>
				</Section.Sidebar>

				<Section.Content>
					<Talks className="grid gap-6" talks={talks.nodes} />
					{/* <Pagination pageContext={pageContext} /> */}
				</Section.Content>
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
			totalCount
			nodes {
				id
				fields {
					slug
				}
				data {
					title
					favorite
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
					talks {
						id
					}
				}
			}
		}
	}
`;
