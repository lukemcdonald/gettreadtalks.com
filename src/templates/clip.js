import React from 'react'
import { graphql } from 'gatsby'

import { Intro } from 'components/intro'
import { Link } from 'components/link'
import { SEO } from 'components/seo'
import { TalksList } from 'components/talks/list'

function SingleClipPage({ data, location }) {
	const { data: clip } = data.clip

	const mediaObject = clip?.link?.childMarkdownRemark
	const media = mediaObject ? mediaObject.html : ''
	const mediaLink =
		mediaObject?.htmlAst?.children?.[0]?.children[1]?.properties?.href

	const hasVideo = media.includes('<iframe')

	return (
		<>
			<SEO title={clip.title} location={location} />

			<Intro align="wide--center" bgGradient fullscreen>
				<Intro.Title>{clip.title}</Intro.Title>

				<Intro.Tagline className="flex justify-center space-x-2">
					<span>
						<span>by</span>&nbsp;
						<Link className="hover:underline" to={clip.speakers[0].fields.slug}>
							{clip.speaker}
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
					<TalksList
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
				speaker
				speakers {
					id
					fields {
						slug
					}
				}
			}
		}
	}
`
