import React from 'react';
import { graphql } from 'gatsby';
import { shuffle } from '../utilities';

import Intro from '../components/intro';
import SEO from '../components/seo';
import Talks from '../components/talks';
import TalksNav from '../components/talks/nav';

import Section, { Content, Heading, Sidebar } from '../components/section';
import Speakers from '../components/speakers';

export default function IndexPage({ data }) {
	const { edges: talks = [] } = data.talks;
	const { edges: speakers = [] } = data.speakers;

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

			<Section className="relative overflow-hidden">
				<ul
					className="absolute left-0 z-0 flex flex-col w-full font-black leading-none tracking-tighter text-gray-200 uppercase transform -right-6 -top-12 css-slideshow"
					style={{ fontSize: '16rem' }}
				>
					<li className="text-right">Gospel</li>
					<li className="text-left">Faithfull</li>
					<li className="text-right">Bold</li>
				</ul>

				<Sidebar>
					<div className="sticky top-10">
						<Heading>Featured Talks</Heading>
						<div className="mb-8 prose">
							<p>
								<strong>Don't know what to listen to?</strong> Try starting with
								one of these favorites.
							</p>
						</div>
						<TalksNav />
					</div>
				</Sidebar>

				<Content>
					<Talks
						className="flex flex-col gap-6"
						talks={shuffle(talks).slice(0, 5)}
					/>
				</Content>
			</Section>

			<Section separator>
				<Sidebar>
					<div className="sticky top-10">
						<Heading>Featured Speakers</Heading>
						<p>
							Have you listened to one of these faithful ministers of the
							Gospel?
						</p>
					</div>
				</Sidebar>

				<Content className="lg:col-span-9">
					<Speakers
						speakers={shuffle(speakers).slice(0, 6)}
						className="grid grid-cols-3 gap-6"
						size="small"
					/>
				</Content>
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
		speakers: allAirtableSpeaker(
			filter: { data: { favorite: { eq: true }, title: { ne: null } } }
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
