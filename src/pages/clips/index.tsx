import { graphql } from 'gatsby'
import type { PageProps } from 'gatsby'

import { ClipList } from '~/components/clip'
import { Page } from '~/components/page'
import { SEO } from '~/components/seo'
import { Section } from '~/components/section'

type Props = PageProps<Queries.ClipsPageQuery>

function ClipsPage({ data, location }: Props) {
  const { clips } = data

  return (
    <>
      <SEO title="Clips" location={location} />

      <Section>
        <Section.Sidebar isSticky>
          <Page.Title>Clips</Page.Title>
          <div className="prose mt-2">
            <p>Be encouraged by these short Christ centered clips.</p>
          </div>
        </Section.Sidebar>

        <Section.Content>
          <ClipList clips={clips.nodes} />
        </Section.Content>
      </Section>
    </>
  )
}

export default ClipsPage

export const query = graphql`
  query ClipsPage {
    clips: allAirtableClip {
      nodes {
        id
        fields {
          slug
        }
        data {
          title
          publishedDate(formatString: "YYYYMMDD")
          speakers {
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
    }
  }
`
