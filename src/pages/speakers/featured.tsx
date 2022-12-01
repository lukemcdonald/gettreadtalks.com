import type { PageProps } from 'gatsby'
import { graphql } from 'gatsby'

import { Page } from '~/components/page'
import { SEO } from '~/components/seo'
import { Section } from '~/components/section'
import { SpeakerFilter, SpeakerList } from '~/components/speaker'

type Props = PageProps<Queries.FeaturedSpeakersPageQuery>

function FeaturedSpeakersPage({ data, location }: Props) {
  const { speakers } = data

  return (
    <>
      <SEO title="Featured Speakers" location={location} />

      <Section>
        <Section.Sidebar isSticky>
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
  query FeaturedSpeakersPage {
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
