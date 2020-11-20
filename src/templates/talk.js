import React from 'react';
import { graphql } from 'gatsby';

import SEO from '../components/seo';
import Section from '../components/section';
import Intro from '../components/intro';

import IntroStyles from '../components/intro.module.css';
import Talks from '../components/talks';
import { shuffle } from '../utilities';
import { Button } from '../components/link';

export default function Talk({ data, location }) {
	const { data: talk } = data.talk;
	const { talks } = talk.speakers[0].data;
	const media = talk?.link?.childMarkdownRemark;
	const mediaObject = media?.htmlAst.children[0].children[0];
	const hasVideo = mediaObject.tagName === 'iframe';

	return (
		<>
			<SEO
				title={`${talk.title} by ${talk.speaker}`}
				description={`Listen to ${talk.title} by ${talk.speaker} from ${talk.scripture}.`}
				location={location}
			/>

			<Intro className={IntroStyles.bgGradient} align="wide" fullscreen>
				<Intro.Title>{talk.title}</Intro.Title>
				<Intro.Tagline>
					<span className="text-gray-500">by</span> {talk.speaker}
					{talk.scripture && (
						<>
							<span className="text-gray-500">&bull;</span> {talk.scripture}
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
					<Button to={mediaObject.properties.href}>
						Listen to Talk &rarr;
					</Button>
				)}
			</Intro>

			{talks.length > 0 && (
				<Section>
					<Section.Sidebar sticky>
						<Section.Heading as="h2">Keep Going</Section.Heading>

						<div className="prose">
							<p>
								<em>Don't stop here!</em> Enjoy{' '}
								{talks.length >= 2 ? 'more talks' : 'another talk'} by{' '}
								{talk.speaker}.
							</p>
							{talks.length > 5 && (
								<p className="mt-6">
									<Button to={talk.speakers[0].fields.slug}>
										More by {talk.speaker} &rarr;
									</Button>
								</p>
							)}
						</div>
					</Section.Sidebar>

					<Section.Content>
						<Talks
							className="grid grid-cols-1 gap-6"
							talks={shuffle(talks).slice(0, 5)}
						/>
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
				link {
					childMarkdownRemark {
						html
						htmlAst
						rawMarkdownBody
					}
				}
				scripture
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
						}
					}
				}
				topics {
					id
					fields {
						slug
					}
					data {
						title
						publishedTalksCount
					}
				}
			}
		}
	}
`;
