import React from 'react';
import { graphql, useStaticQuery } from 'gatsby';
import { shuffle } from '../utilities';

import Intro from '../components/intro';
import SEO from '../components/seo';
import Talks from '../components/talks';
import TalksNav from '../components/talks/nav';

import Section, { Content, Heading, Sidebar } from '../components/section';
import Speakers from '../components/speakers';

export default function IndexPage({ data, location }) {
	const { edges: talks = [] } = data.talks;
	const { edges: speakers = [] } = data.speakers;

	return (
		<>
			<SEO title="Excercise Your Inner Man" location={location} />

			<Intro
				title="Workout your salvation."
				excerpt="Weekly sermons to elevate your spiritual heartbeat."
				image={data.file}
				fullscreen
			/>

			<Section className="relative">
				<ul
					className="absolute inset-x-0 z-0 hidden w-full px-12 overflow-hidden font-black leading-none tracking-tighter text-gray-300 uppercase transform -top-2 css-slideshow md:flex md:flex-col"
					style={{ fontSize: '16vw' }}
				>
					<li className="text-right">Jesus</li>
					<li className="text-right">Is</li>
					<li className="text-right">King</li>
				</ul>

				<Sidebar>
					<div className="sticky top-10">
						<Heading as="h2">Featured Talks</Heading>
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
						<Heading as="h2">Featured Speakers</Heading>
						<p>
							Have you listened to one of these faithful ministers of the
							Gospel?
						</p>
					</div>
				</Sidebar>

				<Content className="lg:col-span-9">
					<Speakers
						speakers={shuffle(speakers).slice(0, 6)}
						className="flex flex-col gap-6 lg:grid lg:grid-cols-2 xl:grid-cols-3"
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
		file(relativePath: { eq: "billy-graham-preaching-header.jpg" }) {
			childImageSharp {
				fluid(grayscale: true) {
					...GatsbyImageSharpFluid_tracedSVG
				}
			}
		}
	}
`;
