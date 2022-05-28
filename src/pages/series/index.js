import { graphql } from 'gatsby'
import React from 'react'

import { Page, SEO, Section } from '~/components'
import { SeriesList } from '~/components/series/list'

function SeriesPage({ data, location }) {
  const { series } = data

  return (
    <>
      <SEO title="Sermon Series" location={location} />

      <Section>
        <Section.Sidebar sticky>
          <Page.Title>Series</Page.Title>

          <div className="prose mt-2">
            <p>
              Each series includes talks given by one or more speakers on the same topic or book of
              the Bible.
            </p>
          </div>
        </Section.Sidebar>

        <Section.Content>
          <SeriesList series={series.nodes} />
        </Section.Content>
      </Section>
    </>
  )
}

export default SeriesPage

export const query = graphql`
  {
    series: allAirtableSerie(
      filter: { data: { title: { ne: null } } }
      sort: { fields: data___title, order: ASC }
    ) {
      nodes {
        id
        fields {
          slug
        }
        data {
          title
          publishedTalksCount
          speakers {
            id
            fields {
              slug
            }
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
