import { useMemo } from 'react'
import type { PageProps } from 'gatsby'
import { graphql } from 'gatsby'

import { Page } from '~/components/page'
import { SEO } from '~/components/seo'
import { Section } from '~/components/section'
import { SpeakerFilter, SpeakerList } from '~/components/speaker'
import { TextCarousel } from '~/components/text-carousel'

type Props = PageProps<Queries.SpeakersPageQuery>

function SpeakersPage({ data, location }: Props) {
  const { speakers } = data

  const speakerIntroBlock = useMemo(
    () => (
      <div className="'relative row-span-2 flex flex-grow items-start rounded border border-transparent bg-white p-4 px-6 py-5 text-left text-gray-700 shadow-sm transition duration-300">
        <div>
          <Page.Title>
            <SpeakerFilter speakers={speakers.nodes} />
          </Page.Title>

          <div className="prose mt-2">
            <p>
              Listen to <em>{speakers.totalCount}</em> faithful ambassadors of Christ and be
              blessed.
            </p>
          </div>
        </div>
      </div>
    ),
    [speakers.nodes, speakers.totalCount],
  )

  return (
    <>
      <SEO title="Speakers" location={location} />

      <TextCarousel text="Repent and Believe" />

      <Section>
        <Section.Content align="full">
          <SpeakerList
            actions={{
              before: speakerIntroBlock,
            }}
            className="xl:grid-cols-4"
            speakers={speakers.nodes}
          />
        </Section.Content>
      </Section>
    </>
  )
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
