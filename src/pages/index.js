import React from 'react';
import { graphql } from 'gatsby';
import { shuffle } from '../utilities';
import RandomProduct from '../components/affiliates/randomProduct';

import Intro from '../components/intro';
import Section from '../components/section';
import SEO from '../components/seo';
import Speakers from '../components/speakers';
import Talks from '../components/talks';
import TalksNav from '../components/talks/nav';
import TextCarousel from '../components/textCarousel';

export default function IndexPage({ data, location }) {
	const { talks, speakers } = data;

	return (
		<>
			<SEO title="Excercise Your Inner Man" location={location} />

			<Intro image={data.file} fullscreen>
				<Intro.Title size="large">Workout your salvation.</Intro.Title>
				<Intro.Tagline>
					<p>Christ centered sermons to elevate your spiritual heartbeat.</p>
				</Intro.Tagline>
			</Intro>

			<Section className="relative">
				<TextCarousel text="Jesus Is King" />

				<Section.Sidebar sticky>
					<Section.Heading as="h2">Featured Talks</Section.Heading>

					<div className="mb-8 prose">
						<p>
							<strong>Don't know what to listen to?</strong> Try starting with
							one of these favorites.
						</p>
					</div>

					<TalksNav title="More Talks" />
				</Section.Sidebar>

				<Section.Content>
					<Talks talks={shuffle(talks.nodes).slice(0, 5)} />
				</Section.Content>
			</Section>

			<Section separator="top">
				<Section.Sidebar sticky>
					<Section.Heading as="h2">Featured Speakers</Section.Heading>

					<p className="prose">
						Have you listened to one of these faithful ministers of the Gospel?
					</p>
				</Section.Sidebar>

				<Section.Content align="wide">
					<Speakers
						className="xl:grid-cols-3"
						speakers={shuffle(speakers.nodes).slice(0, 6)}
					/>
				</Section.Content>
			</Section>

			<Section separator="top-bottom">
				<Section.Sidebar>
					<Section.Heading>Featured Product</Section.Heading>
					<p className="prose">
						Sometimes you come across great products. This is one of them.
					</p>
				</Section.Sidebar>
				<Section.Content>
					<RandomProduct card />
				</Section.Content>
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
			nodes {
				id
				fields {
					slug
				}
				data {
					title
					publishedDate(formatString: "YYYYMMDD")
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
		speakers: allAirtableSpeaker(
			filter: { data: { favorite: { eq: true }, title: { ne: null } } }
			sort: { fields: data___lastName, order: ASC }
		) {
			nodes {
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
		file(relativePath: { eq: "billy-graham-preaching-header.jpg" }) {
			childImageSharp {
				fluid(grayscale: true) {
					...GatsbyImageSharpFluid_tracedSVG
				}
			}
		}
	}
`;
