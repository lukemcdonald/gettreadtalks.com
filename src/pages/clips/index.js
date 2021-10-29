import React from 'react'
import { graphql } from 'gatsby'

import { ClipsList } from 'components/clips/list'
import { Page } from 'components/page'
import { Section } from 'components/section'
import { SEO } from 'components/seo'

function ClipsPage({ data, location }) {
  const { clips } = data

  return (
    <>
      <SEO title="Clips" location={location} />

      <Section>
        <Section.Sidebar sticky>
          <Page.Title>Clips</Page.Title>
          <div className="mt-2 prose">
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
