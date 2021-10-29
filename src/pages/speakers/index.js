import React from 'react'
import { graphql } from 'gatsby'

import { Page } from 'components/page'
import { Section } from 'components/section'
import { SEO } from 'components/seo'
import { SpeakersList } from 'components/speakers/list'
import { SpeakersFilter } from 'components/speakers/filter'
import { TextCarousel } from 'components/text-carousel'

function SpeakersPage({ data, location }) {
  const { speakers } = data

  return (
    <>
      <SEO title="Speakers" location={location} />

      <TextCarousel text="Repent and Believe" />

      <Section>
        <Section.Content align="full">
          <SpeakersList className="xl:grid-cols-4" speakers={speakers.nodes}>
            <div className="items-start row-span-2 px-6 py-5 'relative flex flex-grow p-4 text-left text-gray-700 transition duration-300 bg-white border border-transparent rounded shadow-sm">
              <div>
                <Page.Title>
                  <SpeakersFilter speakers={speakers.nodes} />
                </Page.Title>

                <div className="mt-2 prose">
                  <p>
                    Listen to <em>{speakers.totalCount}</em> faithful ambassadors of Christ and be blessed.
                  </p>
                </div>
              </div>
            </div>
          </SpeakersList>
        </Section.Content>
      </Section>
    </>
  )
}

export default SpeakersPage

export const pageQuery = graphql`
  {
    speakers: allAirtableSpeaker(
      filter: { data: { title: { ne: null }, publishedTalksCount: { gte: 1 } } }
      sort: { fields: data___lastName, order: ASC }
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
                gatsbyImageData(width: 128, placeholder: TRACED_SVG, layout: CONSTRAINED)
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
