import React from 'react';
import { graphql } from 'gatsby';

import Intro from '../components/intro';
import Link from '../components/link';
import SEO from '../components/seo';
import Talks from '../components/talks';

export default function SingleClipPage({ data, location }) {
	const { data: clip } = data.clip;

	const media = clip?.link?.childMarkdownRemark;
	const mediaObject = media?.htmlAst.children[0].children[0];
	const hasVideo = mediaObject.tagName === 'iframe';

	return (
		<>
			<SEO title={clip.title} location={location} />

			<Intro align="wide--center" bgGradient fullscreen>
				<Intro.Title>{clip.title}</Intro.Title>

				<Intro.Tagline className="flex justify-center space-x-2">
					<span>
						<span className="text-gray-500">by</span>&nbsp;
						<Link className="hover:underline" to={clip.speakers[0].fields.slug}>
							{clip.speakers[0].data.title}
						</Link>
					</span>
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
					/>
				)}

				{!hasVideo && (
					<Link.Button to={mediaObject.properties.href}>
						Listen to Clip &rarr;
					</Link.Button>
				)}
			</Intro>
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
				speakers {
					fields {
						slug
					}

					data {
						title
					}
				}
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
		}
	}
`;
