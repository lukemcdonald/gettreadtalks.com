import type { HeadFC, PageProps } from 'gatsby'
import { graphql } from 'gatsby'

import type { TAny } from '~/utils/types/shared'
import { ClipList } from '~/components/clip'
import { Image } from '~/components/image'
import { Intro } from '~/components/intro'
import { Link } from '~/components/link'
import { SEO } from '~/components/seo'
import { Section } from '~/components/section'
import { SpeakerFilter } from '~/components/speaker'
import { TalkList } from '~/components/talk'
import { TextCarousel } from '~/components/text-carousel'
import { maybePluralize } from '~/utils/misc'

interface PageContext {
  slug: string
}

type Props = PageProps<Queries.SingleSpeakerPageQuery, PageContext>

function SingleSpeakerPage({ data, pageContext }: Props) {
  const speaker = data?.speaker?.data
  const speakers = data?.speakers

  if (!speaker) {
    return null
  }

  return (
    <>
      <Intro image={speaker?.banner}>
        <Intro.Title className="flex flex-col">
          {speaker.avatar ? (
            <Image
              className="m-auto mb-4 block w-24 rounded-full border-4 border-white shadow-lg"
              imgClassName="rounded-full"
              image={speaker.avatar as TAny}
              alt={speaker.title || ''}
            />
          ) : null}

          {speakers.nodes ? (
            <SpeakerFilter
              speakers={speakers.nodes}
              current={{
                value: pageContext.slug,
                label: speaker?.title || '',
              }}
            />
          ) : null}
        </Intro.Title>

        <Intro.Tagline className="text-center">{speaker?.role || ''}</Intro.Tagline>
      </Intro>

      <Section
        className="bg-gray-900"
        separator={speaker.banner ? null : 'top'}
        separatorClass="border-gray-700"
      >
        {speaker.ministry ? (
          <Section.Sidebar>
            <Section.Title as="h2" className="text-gray-400">
              Ministry
            </Section.Title>

            <p className="prose mt-3 text-white">
              {speaker.website ? (
                <Link to={speaker.website}>{speaker.ministry}</Link>
              ) : (
                speaker.ministry
              )}
            </p>
          </Section.Sidebar>
        ) : null}

        <Section.Content>
          {speaker.description ? (
            <>
              <Section.Title as="h2" className="text-gray-400">
                About
              </Section.Title>

              <div
                className="prose mt-3 text-white"
                dangerouslySetInnerHTML={{
                  __html: speaker.description?.childMarkdownRemark?.html || '',
                }}
              />
            </>
          ) : null}
        </Section.Content>
      </Section>

      {speaker?.talks ? (
        <Section className="relative">
          <TextCarousel text={`${speaker?.role || 'Ambassador'} for Christ`} />

          <Section.Sidebar isSticky>
            <Section.Title>
              {maybePluralize(speaker.talks.length, `Talk`, {
                showCount: false,
              })}
            </Section.Title>
            <p className="prose">
              Enjoy more talks by {speaker.role} {speaker.title}.
            </p>
          </Section.Sidebar>

          <Section.Content>
            <TalkList talks={speaker.talks} />
          </Section.Content>
        </Section>
      ) : null}

      {speaker.clips ? (
        <Section separator={speaker.talks ? 'top' : null}>
          <Section.Sidebar isSticky>
            <Section.Title>
              <span>
                {maybePluralize(speaker.clips.length, `Clip`, {
                  showCount: false,
                })}
              </span>
            </Section.Title>

            <p className="prose">
              Be encouraged by {speaker.clips.length > 1 ? 'these' : 'this'} short Christ centered{' '}
              {maybePluralize(speaker.clips.length, `clip`, {
                showCount: false,
              })}
              .
            </p>
          </Section.Sidebar>

          <Section.Content>
            <ClipList clips={speaker.clips} />
          </Section.Content>
        </Section>
      ) : null}
    </>
  )
}

export const Head: HeadFC<Queries.SingleSpeakerPageQuery> = ({ data, location }) => {
  const speaker = data?.speaker?.data
  const speakerImage = speaker?.banner?.localFiles?.[0]
  const BASE_URL = process.env.BASE_URL ?? 'https://gettreadtalks.com'

  const structuredData = speaker
    ? [
        {
          '@context': 'https://schema.org',
          '@type': 'Person',
          name: speaker.title,
          jobTitle: speaker.role || 'Minister',
          description:
            speaker.description?.childMarkdownRemark?.excerpt ||
            `${speaker.role || 'Minister'} delivering Christ-centered sermons.`,
          url: `${BASE_URL}${location.pathname}`,
          ...(speaker.website && { sameAs: [speaker.website] }),
          ...(speaker.ministry && {
            affiliation: {
              '@type': 'Organization',
              name: speaker.ministry,
              ...(speaker.website && { url: speaker.website }),
            },
          }),
          ...(speaker.banner?.localFiles?.[0] && {
            image: speakerImage?.childImageSharp?.gatsbyImageData?.images?.fallback?.src,
          }),
          knowsAbout: ['Christianity', 'Bible', 'Theology', 'Preaching', 'Gospel', 'Faith'],
          memberOf: {
            '@type': 'Organization',
            name: 'TREAD Talks',
            url: BASE_URL,
          },
        },
      ]
    : []

  return (
    <SEO
      title={speaker?.title}
      description={speaker?.description?.childMarkdownRemark?.excerpt}
      image={speakerImage?.childImageSharp?.gatsbyImageData?.images?.fallback?.src}
      location={location}
      structuredData={structuredData}
    />
  )
}

export default SingleSpeakerPage

export const query = graphql`
  query SingleSpeakerPage($id: String!) {
    speaker: airtableSpeaker(id: { eq: $id }) {
      data {
        title
        role
        ministry
        website
        description {
          childMarkdownRemark {
            excerpt
            html
          }
        }
        banner {
          localFiles {
            childImageSharp {
              gatsbyImageData(
                placeholder: DOMINANT_COLOR
                transformOptions: { grayscale: true }
                layout: FULL_WIDTH
              )
            }
          }
        }
        avatar {
          localFiles {
            childImageSharp {
              gatsbyImageData(width: 128, placeholder: DOMINANT_COLOR, layout: CONSTRAINED)
            }
          }
        }
        clips {
          id
          fields {
            slug
          }
          data {
            title
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
        talks {
          id
          fields {
            slug
          }
          data {
            title
            favorite
            scripture
            speakers {
              data {
                title
              }
            }
          }
        }
      }
    }
    speakers: allAirtableSpeaker(
      filter: { data: { title: { ne: null } } }
      sort: { data: { lastName: ASC } }
    ) {
      totalCount
      nodes {
        id
        fields {
          slug
        }
        data {
          firstName
          lastName
        }
      }
    }
  }
`
