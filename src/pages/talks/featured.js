import React from 'react'
import { graphql } from 'gatsby'

import { Page } from 'components/page'
import { Section } from 'components/section'
import { SEO } from 'components/seo'
import { TalksFilter } from 'components/talks/filter'
import { TalksList } from 'components/talks/list'

function FeaturedTalksPage({ data, location }) {
	const { talks, topics } = data

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
						<p>
							Choose one of these featured talks to elevate your spiritual
							heartbeat.
						</p>
					</div>
				</Section.Sidebar>

				<Section.Content>
					<TalksList talks={talks.nodes} />
				</Section.Content>
			</Section>
		</>
	)
}

export default FeaturedTalksPage

export const query = graphql`
	{
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
					speaker
					speakers {
						data {
							avatar {
								localFiles {
									childImageSharp {
										gatsbyImageData(
											width: 128
											placeholder: TRACED_SVG
											layout: CONSTRAINED
										)
									}
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
`
