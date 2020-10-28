import React from 'react';
import { getCurrentPosts } from '../utils';

import Intro from '../components/intro';
import SEO from '../components/seo';
import Talks from '../components/talks';
import TalksNav from '../components/talks/nav';

export default function IndexPage({ data }) {
	const { edges: talks = [] } = data.talks;
	const currentTalks = getCurrentPosts(talks, 5);

	return (
		<>
			<SEO
				title="Weekly sermons to elevate your spiritual heartbeat."
				keywords={[
					'tread',
					'talks',
					'Jesus',
					'Christ',
					'God',
					'preaching',
					'religion',
					'sermons',
					'fitness',
					'workout',
					'health',
					'excercise',
				]}
			/>

			<Intro
				title="Workout your salvation."
				excerpt="Weekly sermons to elevate your spiritual heartbeat."
				image={{ name: 'bg-intro' }}
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
			limit: 15
			filter: {
				queryName: { eq: "PUBLISHED_TALKS" }
				data: { publishedDate: { ne: null } }
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
