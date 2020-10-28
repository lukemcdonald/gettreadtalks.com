import React from 'react';
import { graphql } from 'gatsby';
import { getCurrentPosts } from '../../utils';

import Intro from '../../components/intro';
import SEO from '../../components/seo';
import Talks from '../../components/talks';
import TalksNav from '../../components/talks/nav';

export default function FeaturedTalksPage({ data }) {
	const { edges: talks } = data.talks;
	const currentTalks = getCurrentPosts(talks);

	return (
		<>
			<SEO
				title="Featured Talks"
				keywords={['featured', 'talks', 'sermons', 'treadtalks']}
				pathname="/talks/featured/"
			/>

			<Intro
				title="Featured Talks"
				excerpt="Staff picked talks to elevate your spiritual heartbeat."
			/>

			<div className="has-subnav">
				<section>
					<TalksNav />
				</section>

				<section>
					<Talks talks={currentTalks} />
				</section>
			</div>
		</>
	);
}

export const query = graphql`
	query {
		talks: allAirtable(
			filter: {
				queryName: { eq: "PUBLISHED_TALKS" }
				data: { favorite: { eq: true }, publishedDate: { ne: null } }
			}
			sort: { fields: data___publishedDate, order: DESC }
		) {
			edges {
				node {
					id
					data {
						title
						publishedDate(formatString: "YYYYMMDD")
						scripture
						favorite
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
		}
	}
`;
