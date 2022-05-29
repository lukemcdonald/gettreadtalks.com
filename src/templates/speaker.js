import { graphql } from 'gatsby'
import React from 'react'

import { ClipList } from '~/components/clip'
import { ConditionalWrapper } from '~/components/conditional-wrapper'
import { Image } from '~/components/image'
import { Intro } from '~/components/intro'
import { Link } from '~/components/link'
import { Section } from '~/components/section'
import { SEO } from '~/components/seo'
import { SpeakerFilter } from '~/components/speaker'
import { TalkList } from '~/components/talk'
import { TextCarousel } from '~/components/text-carousel'
import { maybePluralize } from '~/utils/misc'

function SingleSpeakerPage({ data, location, pageContext }) {
  const {
    speakers,
    speaker: { data: speaker },
  } = data

  return (
    <>
      <SEO
        title={speaker.title}
        description={speaker.description?.childMarkdownRemark.excerpt}
        image={speaker.avatar?.localFiles?.[0]?.publicURL}
        location={location}
      />

      <Intro image={speaker?.banner}>
        <Intro.Title className="flex flex-col">
          <Image
            className="m-auto mb-4 block w-24 rounded-full border-4 border-white shadow-lg"
            imgClassName="rounded-full"
            image={speaker.avatar}
            alt={speaker.title}
          />

          <SpeakerFilter
            speakers={speakers.nodes}
            current={{
              value: pageContext.slug,
              label: speaker.title,
            }}
          />
        </Intro.Title>

        <Intro.Tagline className="text-center">{speaker?.role || ''}</Intro.Tagline>
      </Intro>

      <Section
        className="bg-gray-900"
        separator={!speaker.banner && 'top'}
        separatorClass="border-gray-700"
      >
        {speaker.ministry && (
          <Section.Sidebar>
            <Section.Title as="h2" className="text-gray-400">
              Ministry
            </Section.Title>

            <p className="prose mt-3 text-white">
              <ConditionalWrapper
                condition={speaker.website}
                wrapper={(children) => <Link to={speaker.website}>{children}</Link>}
              >
                {speaker.ministry}
              </ConditionalWrapper>
            </p>
          </Section.Sidebar>
        )}

        <Section.Content>
          {speaker.description && (
            <>
              <Section.Title as="h2" className="text-gray-400">
                About
              </Section.Title>

              <div
                className="prose mt-3 text-white"
                dangerouslySetInnerHTML={{
                  __html: speaker.description?.childMarkdownRemark.html,
                }}
              />
            </>
          )}
        </Section.Content>
      </Section>

      {speaker?.talks && (
        <Section className="relative">
          <TextCarousel text={`${speaker?.role || 'Ambassador'} for Christ`} />

          <Section.Sidebar sticky>
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
      )}

      {speaker.clips && (
        <Section separator={speaker.talks && 'top'}>
          <Section.Sidebar sticky>
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
      )}
    </>
  )
}

export default SingleSpeakerPage

export const query = graphql`
  query ($id: String!) {
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
                placeholder: TRACED_SVG
                transformOptions: { grayscale: true }
                layout: FULL_WIDTH
              )
            }
          }
        }
        avatar {
          localFiles {
            childImageSharp {
              gatsbyImageData(width: 128, placeholder: TRACED_SVG, layout: CONSTRAINED)
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
      sort: { fields: data___lastName, order: ASC }
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
