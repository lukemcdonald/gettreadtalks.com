import React from 'react';
import { graphql } from 'gatsby';
import { Button } from '../components/link';

import Intro from '../components/intro';
import SEO from '../components/seo';

import Section from '../components/section';
import Speakers from '../components/speakers';
import Topics from '../components/topics';
import Talks from '../components/talks';

import IntroStyles from '../components/intro.module.css';

export default function SingleClipPage({ data, location }) {
	const { data: clip } = data.clip;

	const media = clip?.link?.childMarkdownRemark;
	const mediaObject = media?.htmlAst.children[0].children[0];
	const hasVideo = mediaObject.tagName === 'iframe';

	return (
		<>
			<SEO title={clip.title} location={location} />

			<Intro className={IntroStyles.bgGradient} align="wide" fullscreen>
				<Intro.Title>{clip.title}</Intro.Title>
				<Intro.Tagline>
					<span className="text-gray-500">by</span>{' '}
					{clip.speakers.map((speaker) => speaker.data.title).join(', ')}
					{console.log(clip.speakers)}
				</Intro.Tagline>

				{hasVideo && (
					<figure
						className="relative z-10 mt-10 rounded-t shadow-lg embed-responsive aspect-ratio-16x9"
						dangerouslySetInnerHTML={{
							__html: media.html.replace(/<p>|<\/p>/g, ''),
						}}
					/>
				)}

				{clip.talks && (
					<Talks
						className="-mt-1"
						talks={clip.talks}
						subtitle="Related Talk:"
						hideAvatar
					/>
				)}

				{!hasVideo && (
					<Button to={mediaObject.properties.href}>
						Listen to Clip &rarr;
					</Button>
				)}
			</Intro>

			<Section>
				{clip.topics && (
					<Section.Sidebar>
						<Section.Heading>
							{clip.topics.length === 1 ? `Topic` : `Topics`}
						</Section.Heading>
						<Topics topics={clip.topics} />
					</Section.Sidebar>
				)}
				<Section.Content>
					{clip.speakers && (
						<div>
							<h2>{clip.speakers.length === 1 ? `Speaker` : `Speakers`}</h2>
							<Speakers speakers={clip.speakers} />
						</div>
					)}
				</Section.Content>
			</Section>
		</>
	);
}

export const query = graphql`
	query($id: String!) {
		clip: airtableClip(id: { eq: $id }) {
			id
			data {
				title
				path
				link {
					childMarkdownRemark {
						html
						htmlAst
						rawMarkdownBody
					}
				}
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
							fields {
								slug
							}
							data {
								title
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
				speakers {
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
