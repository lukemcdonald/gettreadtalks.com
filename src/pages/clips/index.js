import { graphql } from 'gatsby'
import React from 'react'

import { Page, SEO, Section } from '~/components'
import { ClipsList } from '~/components/clips/list'

function ClipsPage({ data, location }) {
  const { clips } = data

  return (
    <>
      <SEO title="Clips" location={location} />

      <Section>
        <Section.Sidebar sticky>
          <Page.Title>Clips</Page.Title>
          <div className="prose mt-2">
            <p>Be encouraged by these short Christ centered clips.</p>
          </div>
        </Section.Sidebar>

        <Section.Content>
          <ClipsList clips={clips.nodes} />
        </Section.Content>
      </Section>
    </>
  )
}

export default ClipsPage

export const query = graphql`
  {
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
