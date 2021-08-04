import React from 'react'
import { graphql } from 'gatsby'

import { Section } from 'components/section'
import { SEO } from 'components/seo'
import { Intro } from 'components/intro'
import { TalksList } from 'components/talks/list'

function SingleSeriesPage({ data, location }) {
	const { data: series } = data.series

	return (
		<>
			<SEO title={series.title} location={location} />

			<Intro>
				<Intro.Title>{series.title}</Intro.Title>
			</Intro>

			<Section>
				<Section.Content>
					<TalksList talks={series.talks} />
				</Section.Content>
			</Section>
		</>
	)
}

export default SingleSeriesPage

export const query = graphql`
	query ($id: String!) {
		series: airtableSerie(id: { eq: $id }) {
			id
			fields {
				slug
			}
			data {
				title
				talks {
					fields {
						slug
					}
					data {
						title
						favorite
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
				}
			}
		}
	}
`
