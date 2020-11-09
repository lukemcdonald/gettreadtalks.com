import React from 'react';
import { graphql } from 'gatsby';

import SEO from '../components/seo';
import Intro from '../components/intro';
import Talks from '../components/talks';

export default function SingleSeriesPage({ data, location }) {
	const { data: series } = data.series;

	return (
		<>
			<SEO title={series.title} location={location} />

			<Intro title={series.title} excerpt="" />

			<section>
				<div>
					<Talks talks={series.talks} />
				</div>
			</section>
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
