import React from 'react';
import { graphql } from 'gatsby';

import SEO from '../../components/seo';
import Talks from '../../components/talks';
import Section from '../../components/section';
import Page from '../../components/page';
import TalksFilter from '../../components/talks/filter';

export default function FeaturedTalksPage({ data, location }) {
	const { talks, topics } = data;

	return (
		<>
			<SEO title="Featured Talks" location={location} />

			<Section>
				<Section.Sidebar sticky>
					<Page.Title className="relative">
						<TalksFilter
							topics={topics.nodes}
							current={{
								label: '★ Talks',
								value: '/talks/featured/',
							}}
						/>
					</Page.Title>

					<div className="mt-2 prose">
						<p>Featured talks picked to elevate your spiritual heartbeat.</p>
					</div>
				</Section.Sidebar>

				<Section.Content>
					<Talks className="grid gap-6" talks={talks.nodes} />
				</Section.Content>
			</Section>
		</>
	);
}

export const query = graphql`
	query {
		talks: allAirtableTalk(
			filter: { data: { favorite: { eq: true }, publishedDate: { ne: null } } }
			sort: { fields: data___publishedDate, order: DESC }
		) {
			nodes {
				id
				data {
					title
					publishedDate(formatString: "YYYYMMDD")
					scripture
					speakers {
						id
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
						fields {
							slug
						}
					}
				}
				fields {
					slug
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
