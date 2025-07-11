import type { HeadFC, PageProps } from 'gatsby'
import { graphql } from 'gatsby'

import { Page } from '~/components/page'
import { SEO } from '~/components/seo'
import { Section } from '~/components/section'
import { SpeakerFilter, SpeakerList } from '~/components/speaker'

type Props = PageProps<Queries.FeaturedSpeakersPageQuery>

function FeaturedSpeakersPage({ data }: Props) {
  const { speakers } = data

  return (
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
  )
}

export const Head: HeadFC<Queries.FeaturedSpeakersPageQuery> = ({ data, location }) => {
  const speakerCount = data?.speakers?.totalCount || 0
  const description = `Discover ${speakerCount} hand-picked faithful ministers of the Gospel. These featured speakers deliver Christ-centered sermons to elevate your spiritual heartbeat.`

  return <SEO title="Featured Speakers" description={description} location={location} />
}

export default FeaturedSpeakersPage

export const query = graphql`
  query FeaturedSpeakersPage {
    speakers: allAirtableSpeaker(
      filter: { data: { title: { ne: null }, favorite: { eq: true } } }
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
