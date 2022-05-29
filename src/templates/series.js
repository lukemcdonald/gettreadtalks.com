import { graphql } from 'gatsby'
import React from 'react'

import { Intro } from '~/components/intro'
import { Section } from '~/components/section'
import { SEO } from '~/components/seo'
import { TalkList } from '~/components/talk'

function SingleSeriesPage({ data, location }) {
  const { data: series } = data.series

  return (
    <>
      <SEO title={series.title} location={location} />

      <Intro>
        <Intro.Title>{series.title}</Intro.Title>
      </Intro>

      <Section>
        <Section.Content>
          <TalkList talks={series.talks} />
        </Section.Content>
      </Section>
    </>
  )
}

export default SingleSeriesPage

export const query = graphql`
  query ($id: String!) {
    series: airtableSerie(id: { eq: $id }) {
      id
      fields {
        slug
      }
      data {
        title
        talks {
          fields {
            slug
          }
          data {
            title
            favorite
            scripture
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
  }
`
