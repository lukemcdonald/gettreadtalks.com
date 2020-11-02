import React from 'react';
import { graphql } from 'gatsby';

import { getCurrentPosts } from '../utils';

import Intro from '../components/intro';
import SEO from '../components/seo';
import Talks from '../components/talks';
import TalksNav from '../components/talks/nav';
import RandomProduct from '../components/affiliates/randomProduct';

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
				image={{ name: 'billy-graham-preaching-header' }}
			/>

			<div className="container flex justify-between gap-12 mt-16">
				<section className="w-1/5">
					<TalksNav />
				</section>

				<section className="flex-grow max-w-65ch">
					<Talks talks={currentTalks} />
					<RandomProduct />
				</section>

				<span className="w-1/5" />
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
