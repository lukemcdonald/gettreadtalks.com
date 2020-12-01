import React from 'react';
import { graphql } from 'gatsby';

import Section from '../components/section';
import SEO from '../components/seo';
import Intro from '../components/intro';
import Talks from '../components/talks';

export default function SingleSeriesPage({ data, location }) {
	const { data: series } = data.series;

	return (
		<>
			<SEO title={series.title} location={location} />

			<Intro>
				<Intro.Title>{series.title}</Intro.Title>
			</Intro>

			<Section>
				<Section.Content>
					<Talks className="grid gap-6" talks={series.talks} />
				</Section.Content>
			</Section>
		</>
	);
}

export const pageQuery = graphql`
	query($id: String!) {
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
