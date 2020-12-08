import React from 'react';
import { graphql } from 'gatsby';

import { shuffle } from '../utilities';

import Intro from '../components/intro';
import Link from '../components/link';
import Section from '../components/section';
import SEO from '../components/seo';
import Series from '../components/series';
import Talks from '../components/talks';

export default function Talk({ data, location }) {
	const { data: talk } = data.talk;
	const { talks } = talk.speakers[0].data;
	const media = talk?.link?.childMarkdownRemark;
	const mediaObject = media?.htmlAst.children[0].children[0];
	const hasVideo = mediaObject.tagName === 'iframe';
	const hasTalks = talks.length > 0;
	const hasSeries = talk?.series;

	return (
		<>
			<SEO
				title={`${talk.title} by ${talk.speaker}`}
				description={`Listen to ${talk.title} by ${talk.speaker} from ${talk.scripture}.`}
				location={location}
			/>

			<Intro align="wide--center" bgGradient fullscreen>
				<Intro.Title>{talk.title}</Intro.Title>

				<Intro.Tagline className="flex justify-center space-x-2">
					<span>
						<span className="text-gray-500">by</span>&nbsp;
						<Link className="hover:underline" to={talk.speakers[0].fields.slug}>
							{talk.speaker}
						</Link>
					</span>

					{talk.scripture && (
						<>
							<span className="text-gray-500">&bull;</span>
							<span>{talk.scripture}</span>
						</>
					)}
				</Intro.Tagline>

				{hasVideo && (
					<figure
						className="mt-10 rounded shadow-lg embed-responsive aspect-ratio-16x9"
						dangerouslySetInnerHTML={{
							__html: media.html.replace(/<p>|<\/p>/g, ''),
						}}
					/>
				)}

				{!hasVideo && (
					<p className="mt-12 text-center">
						<Link.Button
							to={mediaObject.properties.href}
							color="primary"
							size="large"
						>
							Listen to Talk &rarr;
						</Link.Button>
					</p>
				)}
			</Intro>

			{hasSeries && (
				<Section separator={hasTalks && 'bottom'}>
					<Section.Sidebar sticky>
						<Section.Heading as="h2">Series</Section.Heading>

						<div className="prose">
							<p>This talk is part of a series of related talks.</p>
						</div>
					</Section.Sidebar>

					<Section.Content>
						<Series className="grid gap-6" series={talk.series} />
					</Section.Content>
				</Section>
			)}

			{hasTalks && (
				<Section>
					<Section.Sidebar sticky>
						<Section.Heading as="h2">Talks</Section.Heading>

						<div className="prose">
							<p>
								Enjoy {talks.length >= 2 ? 'more talks' : 'another talk'} by{' '}
								{talk.speaker}.
							</p>
						</div>
					</Section.Sidebar>

					<Section.Content>
						<Talks className="grid gap-6" talks={shuffle(talks).slice(0, 5)} />
						{talks.length > 5 && (
							<p className="mt-6">
								<Link
									className="font-medium hover:underline"
									to={talk.speakers[0].fields.slug}
								>
									More by {talk.speaker} &rarr;
								</Link>
							</p>
						)}
					</Section.Content>
				</Section>
			)}
		</>
	);
}

export const query = graphql`
	query($id: String!) {
		talk: airtableTalk(id: { eq: $id }) {
			id
			data {
				title
				favorite
				link {
					childMarkdownRemark {
						html
						htmlAst
						rawMarkdownBody
					}
				}
				scripture
				series {
					id
					fields {
						slug
					}
					data {
						title
						publishedTalksCount
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
				speaker
				speakers {
					id
					fields {
						slug
					}
					data {
						talks {
							id
							fields {
								slug
							}
							data {
								title
								favorite
								publishedDate(formatString: "YYYYMMDD")
								scripture
								speakers {
									id
									fields {
										slug
									}
									data {
										title
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
