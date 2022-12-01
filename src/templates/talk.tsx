import { useEffect, useMemo, useState } from 'react'
import type { PageProps } from 'gatsby'
import { graphql } from 'gatsby'
import {
  EnvelopeIcon as EmailIcon,
  ArrowTopRightOnSquareIcon as ExternalLinkIcon,
} from '@heroicons/react/24/outline'

import type { RemarkMedia } from '~/utils/types/shared'
import { FavoriteToggle, FinishedToggle, TalkList } from '~/components/talk'
import { Intro } from '~/components/intro'
import { Link } from '~/components/link'
import { SEO } from '~/components/seo'
import { Section } from '~/components/section'
import { SeriesList } from '~/components/series'
import { arrayShuffle } from '~/utils/misc'

interface PageContext {
  id: string
}

type Props = PageProps<Queries.TalkPageQuery, PageContext>

function TalkPage({ data, location, pageContext }: Props) {
  const talk = {
    id: data.talk?.id,
    ...data.talk?.data,
  }

  const speaker = {
    ...talk.speakers?.[0]?.data,
    ...talk.speakers?.[0]?.fields,
  }

  const [moreTalks, setMoreTalks] = useState<typeof speaker.talks>([])
  const shuffledTalks = useMemo(() => arrayShuffle<typeof moreTalks>(moreTalks), [moreTalks])

  const media = talk?.link?.childMarkdownRemark as RemarkMedia
  const mediaLink: string = media?.htmlAst?.children?.[0]?.children?.[0]?.properties?.href || ''

  const hasVideo = media?.html?.includes('<iframe')
  const hasMoreTalks = moreTalks && moreTalks.length > 0
  const hasSeries = talk?.series

  const mailToData = {
    subject: encodeURIComponent(talk.title || ''),
    body: encodeURIComponent(location.href),
  }

  useEffect(() => {
    if (speaker.talks) {
      // Get more talks from the same speaker excluding current talk.
      const filtered = speaker.talks?.filter((talk) => talk?.id !== pageContext.id)
      if (filtered.length > 0) {
        setMoreTalks(filtered)
      }
    }
  }, [pageContext.id, speaker.talks])

  return (
    <>
      <SEO
        title={`${talk.title} by ${speaker.title}`}
        description={`Listen to ${talk.title} by ${speaker.title} from ${talk.scripture}.`}
        location={location}
      />

      <Intro align="wide--center" bgGradient fullscreen>
        <Intro.Title>{talk.title}</Intro.Title>

        {speaker.title && speaker.slug ? (
          <Intro.Tagline className="sm:flex sm:justify-center sm:space-x-2">
            <div>
              <span>by</span>&nbsp;
              <Link className="hover:underline" to={speaker.slug}>
                {speaker.title}
              </Link>
            </div>
          </Intro.Tagline>
        ) : null}

        {hasVideo ? (
          <div
            className="aspect-w-16 aspect-h-9 mt-10 rounded shadow-lg"
            dangerouslySetInnerHTML={{
              __html: media.html || '',
            }}
          />
        ) : null}

        {!hasVideo && mediaLink ? (
          <p className="mt-10 text-center">
            <Link.Button
              to={mediaLink}
              color="primary"
              size="large"
              className="hover:bg-primary-700"
            >
              Listen to Talk &rarr;
            </Link.Button>
          </p>
        ) : null}
      </Intro>

      <Section className="bg-gray-900 text-white" separator="top" separatorClass="border-gray-700">
        <Section.Sidebar>
          <Section.Title as="h2" className="text-gray-400">
            Actions
          </Section.Title>

          <div className="mt-3 flex">
            {talk.id && talk.title ? (
              <>
                <FavoriteToggle
                  className="mb-2 mr-2 h-10 w-10"
                  classNameToggle={{
                    on: 'rounded-full p-2 bg-favorite-700',
                    off: 'rounded-full p-2 bg-gray-600 hover:bg-favorite-700',
                  }}
                  talk={{
                    id: talk.id,
                    title: talk.title,
                  }}
                />

                <FinishedToggle
                  className="mb-2 mr-2 h-10 w-10"
                  classNameToggle={{
                    on: 'rounded-full p-2 bg-finished-700',
                    off: 'rounded-full p-2 bg-gray-600 hover:bg-finished-700',
                  }}
                  talk={{
                    id: talk.id,
                    title: talk.title,
                  }}
                />
              </>
            ) : null}

            <a
              className="mb-2 h-10 w-10"
              href={`mailto:?subject=${mailToData.subject}&body=${mailToData.body}`}
            >
              <EmailIcon className="h-full w-full rounded-full bg-gray-600 p-2 hover:bg-gray-800" />
            </a>
          </div>
        </Section.Sidebar>

        {talk.topics && talk.topics?.length > 0 ? (
          <Section.Content>
            <Section.Title as="h2" className="text-gray-400">
              {talk.topics.length > 1 ? 'Topics' : 'Topic'}
            </Section.Title>

            <div className="mt-3">
              {talk.topics.map((topic) => {
                const topicSlug = topic?.fields?.slug
                const topicTitle = topic?.data?.title
                if (!topicSlug || !topicTitle) return null
                return (
                  <Link.Button className="mb-2 mr-2" key={topic?.fields?.slug} to={topicSlug}>
                    {topicTitle}
                  </Link.Button>
                )
              })}
            </div>
          </Section.Content>
        ) : null}

        {talk.scripture ? (
          <Section.Sidebar className="pb-6">
            <Section.Title as="h2" className="text-gray-400">
              Scripture
            </Section.Title>
            <div className="prose text-white">
              <Link.Button
                className="inline-flex items-center"
                to={`https://www.biblegateway.com/passage/?version=esv&search=${encodeURI(
                  talk.scripture,
                )}`}
              >
                <span>{talk.scripture}</span>
                <ExternalLinkIcon className="ml-2 h-5 w-5 opacity-80" />
              </Link.Button>
            </div>
          </Section.Sidebar>
        ) : null}
      </Section>

      {hasSeries ? (
        <Section separator={hasMoreTalks ? 'bottom' : 'top'}>
          <Section.Sidebar isSticky>
            <Section.Title as="h2">Series</Section.Title>

            <div className="prose">
              <p>This talk is part of a series of related talks.</p>
            </div>
          </Section.Sidebar>

          <Section.Content>
            <SeriesList series={talk.series} />
          </Section.Content>
        </Section>
      ) : null}

      {hasMoreTalks ? (
        <Section>
          <Section.Sidebar isSticky>
            <Section.Title as="h2">Talks</Section.Title>

            <div className="prose">
              <p>
                {`Enjoy ${shuffledTalks?.length >= 2 ? 'more talks' : 'another talk'} by ${
                  speaker.title
                }.`}
              </p>
            </div>
          </Section.Sidebar>

          <Section.Content>
            <TalkList talks={shuffledTalks.slice(0, 5)} />

            {speaker.slug && shuffledTalks?.length > 5 ? (
              <p className="mt-6">
                <Link className="font-medium hover:underline" to={speaker.slug}>
                  More by {speaker.title} &rarr;
                </Link>
              </p>
            ) : null}
          </Section.Content>
        </Section>
      ) : null}
    </>
  )
}

export default TalkPage

export const query = graphql`
  query TalkPage($id: String!) {
    talk: airtableTalk(id: { eq: $id }) {
      id
      data {
        title
        favorite
        link {
          childMarkdownRemark {
            html
            htmlAst
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
                      gatsbyImageData(width: 128, placeholder: TRACED_SVG, layout: CONSTRAINED)
                    }
                  }
                }
              }
            }
          }
        }
        speakers {
          id
          fields {
            slug
          }
          data {
            title
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
        topics {
          data {
            title
          }
          fields {
            slug
          }
        }
      }
    }
  }
`
