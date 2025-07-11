import type { HeadFC, PageProps } from 'gatsby'
import { graphql } from 'gatsby'

import type { RemarkMedia } from '~/utils/types/shared'
import { Intro } from '~/components/intro'
import { Link } from '~/components/link'
import { SEO } from '~/components/seo'
import { TalkList } from '~/components/talk'

type Props = PageProps<Queries.SingleClipPageQuery>

function SingleClipPage({ data }: Props) {
  const clip = data?.clip?.data

  if (!clip) {
    return null
  }

  const speaker = {
    ...clip.speakers?.[0]?.data,
    ...clip.speakers?.[0]?.fields,
  }

  const media = clip?.link?.childMarkdownRemark as RemarkMedia
  const mediaLink: string = media?.htmlAst?.children?.[0]?.children?.[0]?.properties?.href || ''
  const hasVideo = media?.html?.includes('<iframe')

  return (
    <Intro align="wide--center" bgGradient fullscreen>
      <Intro.Title>{clip.title}</Intro.Title>

      {speaker?.title && speaker.slug ? (
        <Intro.Tagline className="flex justify-center space-x-2">
          <span>
            <span>by</span>&nbsp;
            <Link className="hover:underline" to={speaker.slug}>
              {speaker.title}
            </Link>
          </span>
        </Intro.Tagline>
      ) : null}

      {hasVideo ? (
        <figure
          className="aspect-w-16 aspect-h-9 relative z-10 mt-10 rounded-t shadow-lg"
          dangerouslySetInnerHTML={{
            __html: media?.html || '',
          }}
        />
      ) : null}

      {clip.talks ? (
        <TalkList className="-mt-1" subtitle="Related Talk:" talks={clip.talks} />
      ) : null}

      {!hasVideo && mediaLink ? (
        <Link.Button to={mediaLink}>Listen to Clip &rarr;</Link.Button>
      ) : null}
    </Intro>
  )
}

export const Head: HeadFC<Queries.SingleClipPageQuery> = ({ data, location }) => {
  const clip = data?.clip?.data
  const speaker = clip?.speakers?.[0]?.data
  const description =
    clip && speaker
      ? `Watch "${clip.title}" by ${speaker.title}. A compelling video clip from TREAD Talks.`
      : 'Watch this compelling video clip from TREAD Talks.'

  return <SEO title={clip?.title} description={description} location={location} />
}

export default SingleClipPage

export const query = graphql`
  query SingleClipPage($id: String!) {
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
