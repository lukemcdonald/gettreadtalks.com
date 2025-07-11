import { Fragment, useMemo } from 'react'
import type { HeadFC, PageProps } from 'gatsby'
import { graphql } from 'gatsby'

import { Page } from '~/components/page'
import { SEO } from '~/components/seo'
import { Section } from '~/components/section'
import { SpeakerFilter, SpeakerList } from '~/components/speaker'
import { TextCarousel } from '~/components/text-carousel'

type Props = PageProps<Queries.SpeakersPageQuery>

function getSortedSpeakersMap(speakers: Props['data']['speakers']['nodes']) {
  const speakersMap = new Map<string, typeof speakers>()

  for (const speaker of speakers) {
    // get first letter of speaker's last name
    const letter = speaker.data?.lastName?.charAt(0)

    if (!letter) {
      continue
    }

    // add speaker to speakers map by letter of last name
    if (!speakersMap.has(letter)) {
      speakersMap.set(letter, [speaker])
    } else {
      const speakers = speakersMap.get(letter) || []
      speakersMap.set(letter, [...speakers, speaker])
    }
  }

  // sort speakers map keys alphabetically
  return new Map([...speakersMap.entries()].sort())
}

function getSpeakersSectionLabel(speakers: Props['data']['speakers']['nodes']) {
  const firstSpeaker = speakers[0]
  const lastSpeaker = speakers.at(-1)

  if (!firstSpeaker?.data || !lastSpeaker?.data) {
    return ''
  }

  if (firstSpeaker.data.lastName === lastSpeaker.data.lastName) {
    return firstSpeaker.data.lastName
  }

  return (
    <>
      {firstSpeaker.data.lastName}
      <span className="text-gray-400">&mdash;</span>
      {lastSpeaker.data.lastName}
    </>
  )
}

function SpeakersPage({ data }: Props) {
  const { speakers } = data
  const speakersMap = useMemo(() => getSortedSpeakersMap(speakers.nodes), [speakers.nodes])

  return (
    <>
      <TextCarousel text="Repent and Believe" />

      <Section>
        <Section.Sidebar>
          <Page.Title>
            <SpeakerFilter
              speakers={speakers.nodes}
              current={{
                value: '/speakers/',
                label: 'All Speakers',
              }}
            />
          </Page.Title>

          <div className="prose mt-2">
            <p>
              Listen to <em>{speakers.totalCount}</em> faithful ambassadors of Christ and be
              blessed.
            </p>
          </div>
        </Section.Sidebar>

        <Section.Content align="wide">
          {Array.from(speakersMap).map(([letter, speakers]) => {
            const key = `speakers-${letter}`
            const speakersSectionLabel = getSpeakersSectionLabel(speakers)

            return (
              <Fragment key={key}>
                <h2
                  className="mb-2 mt-12 flex items-center justify-between gap-4 py-2 text-lg text-gray-900 first-of-type:mt-0"
                  id={key}
                >
                  <span className="font-bold">{letter}</span>
                  <span className="relative top-px flex-grow border-b border-gray-300"></span>
                  <span className="text-xs uppercase tracking-wide text-gray-500">
                    {speakersSectionLabel}
                  </span>
                </h2>
                <SpeakerList speakers={speakers} />
              </Fragment>
            )
          })}
        </Section.Content>
      </Section>
    </>
  )
}

export const Head: HeadFC<Queries.SpeakersPageQuery> = ({ data, location }) => {
  const speakerCount = data?.speakers?.totalCount || 0
  const description = `Listen to ${speakerCount} faithful ambassadors of Christ and be blessed. Browse our complete directory of ministers delivering Christ-centered sermons.`

  return <SEO title="Speakers" description={description} location={location} />
}

export default SpeakersPage

export const pageQuery = graphql`
  query SpeakersPage {
    speakers: allAirtableSpeaker(
      filter: { data: { title: { ne: null }, publishedTalksCount: { gte: 1 } } }
      sort: { data: { lastName: ASC } }
    ) {
      totalCount
      nodes {
        id
        fields {
          slug
        }
        data {
          title
          favorite
          firstName
          lastName
          role
          website
          avatar {
            localFiles {
              childImageSharp {
                gatsbyImageData(width: 128, placeholder: DOMINANT_COLOR, layout: CONSTRAINED)
              }
            }
          }
          talks {
            id
          }
        }
      }
    }
  }
`
