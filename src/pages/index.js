import React from 'react';
import { graphql } from 'gatsby';
import { shuffle } from '../utilities';

import Intro from '../components/intro';
import SEO from '../components/seo';
import Talks from '../components/talks';
import TalksNav from '../components/talks/nav';

import Section, { Content, Heading, Sidebar } from '../components/section';

export default function IndexPage({ data }) {
	const { edges: talks = [] } = data.talks;

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

			<Section>
				<Sidebar>
					<Heading>Featured Talks</Heading>
					<div className="mb-8 prose">
						<p>
							<strong>Don't know where to begin?</strong> Try starting with one
							of these favorites.
						</p>
					</div>
					<TalksNav />
				</Sidebar>

				<Content>
					<Talks talks={shuffle(talks).slice(0, 5)} />
				</Content>
			</Section>

			<Section separator>
				<Sidebar>
					<Heading>Speakers</Heading>
				</Sidebar>

				<Content>
					<ul className="grid grid-cols-3 gap-6">
						<li className="bg-white">#1</li>
						<li className="bg-white">#2</li>
						<li className="bg-white">#3</li>
						<li className="bg-white">#4</li>
						<li className="bg-white">#1</li>
						<li className="bg-white">#2</li>
						<li className="bg-white">#3</li>
						<li className="bg-white">#4</li>
					</ul>
				</Content>
			</Section>
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
		speakers: allAirtable(
			filter: {
				queryName: { eq: "PUBLISHED_SPEAKERS" }
				data: { title: { ne: null } }
			}
			sort: { fields: data___lastName, order: ASC }
		) {
			edges {
				node {
					id
					fields {
						slug
					}
					data {
						title
						role
						ministry
						website
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
`;
