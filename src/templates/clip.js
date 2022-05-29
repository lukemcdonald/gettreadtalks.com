import { graphql } from 'gatsby'
import React from 'react'

import { Intro } from '~/components/intro'
import { Link } from '~/components/link'
import { SEO } from '~/components/seo'
import { TalkList } from '~/components/talk'

function SingleClipPage({ data, location }) {
  const { data: clip } = data.clip

  const speaker = {
    ...clip.speakers[0].data,
    ...clip.speakers[0].fields,
  }

  const mediaObject = clip?.link?.childMarkdownRemark
  const media = mediaObject ? mediaObject.html : ''
  const mediaLink = mediaObject?.htmlAst?.children?.[0]?.children[0]?.properties?.href

  const hasVideo = media.includes('<iframe')

  return (
    <>
      <SEO title={clip.title} location={location} />

      <Intro align="wide--center" bgGradient fullscreen>
        <Intro.Title>{clip.title}</Intro.Title>

        <Intro.Tagline className="flex justify-center space-x-2">
          <span>
            <span>by</span>&nbsp;
            <Link className="hover:underline" to={speaker.slug}>
              {speaker.title}
            </Link>
          </span>
        </Intro.Tagline>

        {hasVideo && (
          <figure
            className="aspect-w-16 aspect-h-9 relative z-10 mt-10 rounded-t shadow-lg"
            dangerouslySetInnerHTML={{
              __html: clip?.link?.childMarkdownRemark.html,
            }}
          />
        )}

        {clip.talks && <TalkList className="-mt-1" subtitle="Related Talk:" talks={clip.talks} />}

        {!hasVideo && mediaLink && <Link.Button to={mediaLink}>Listen to Clip &rarr;</Link.Button>}
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
            speakers {
              data {
                title
              }
            }
            favorite
            publishedDate(formatString: "YYYYMMDD")
          }
        }
      }
    }
  }
`
