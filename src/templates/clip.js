import React from 'react'
import { graphql } from 'gatsby'

import { Intro } from '../components/intro'
import { Link } from '../components/link'
import { SEO } from '../components/seo'
import { Talks } from '../components/talks/list'

function SingleClipPage({ data, location }) {
	const { data: clip } = data.clip

	const mediaObject = clip?.link?.childMarkdownRemark
	const media = mediaObject ? mediaObject.html : ''
	const mediaLink =
		mediaObject?.htmlAst?.children[0]?.children[1]?.properties?.href

	const hasVideo = media.includes('<iframe')

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
							__html: clip?.link?.childMarkdownRemark.html,
						}}
					/>
				)}

				{clip.talks && (
					<Talks
						className="-mt-1"
						subtitle="Related Talk:"
						talks={clip.talks}
					/>
				)}

				{!hasVideo && mediaLink && (
					<Link.Button to={mediaLink}>Listen to Clip &rarr;</Link.Button>
				)}
			</Intro>
		</>
	)
}

export default SingleClipPage

export const query = graphql`
	query ($id: String!) {
		clip: airtableClip(id: { eq: $id }) {
			id
			data {
				title
				path
				link {
					childMarkdownRemark {
						html
						htmlAst
					}
				}
				speakers {
					id
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
											gatsbyImageData(
												width: 128
												placeholder: TRACED_SVG
												layout: CONSTRAINED
											)
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
`
