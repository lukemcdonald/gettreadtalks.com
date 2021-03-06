import { graphql } from 'gatsby'
import React from 'react'

import { Page } from '~/components/page'
import { Section } from '~/components/section'
import { SEO } from '~/components/seo'
import { SpeakerFilter, SpeakerList } from '~/components/speaker'

function FeaturedSpeakersPage({ data, location }) {
  const { speakers } = data

  return (
    <>
      <SEO title="Featured Speakers" location={location} />

      <Section>
        <Section.Sidebar sticky>
          <Page.Title>
            <SpeakerFilter
              speakers={speakers.nodes}
              current={{
                value: '/speakers/featured/',
                label: '★ Speakers',
              }}
            />
          </Page.Title>

          <div className="prose mt-2">
            <p>
              Here are <em>{speakers.totalCount}</em> hand picked stewards of Gods word to help get
              you going.
            </p>
          </div>
        </Section.Sidebar>

        <Section.Content align="wide">
          <SpeakerList className="xl:grid-cols-3" speakers={speakers.nodes} />
        </Section.Content>
      </Section>
    </>
  )
}

export default FeaturedSpeakersPage

export const query = graphql`
  {
    speakers: allAirtableSpeaker(
      filter: { data: { title: { ne: null }, favorite: { eq: true } } }
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
