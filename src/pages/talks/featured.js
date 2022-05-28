import { graphql } from 'gatsby'
import React from 'react'

import { Page, SEO, Section } from '~/components'
import { TalksFilter } from '~/components/talks/filter'
import { TalksList } from '~/components/talks/list'

function FeaturedTalksPage({ data, location }) {
  const { talks, topics } = data

  return (
    <>
      <SEO title="Featured Talks" location={location} />

      <Section>
        <Section.Sidebar sticky>
          <Page.Title className="relative">
            <TalksFilter
              topics={topics.nodes}
              current={{
                label: '★ Talks',
                value: '/talks/featured/',
              }}
            />
          </Page.Title>

          <div className="prose mt-2">
            <p>Choose one of these featured talks to elevate your spiritual heartbeat.</p>
          </div>
        </Section.Sidebar>

        <Section.Content>
          <TalksList talks={talks.nodes} />
        </Section.Content>
      </Section>
    </>
  )
}

export default FeaturedTalksPage

export const query = graphql`
  {
    talks: allAirtableTalk(
      filter: { data: { favorite: { eq: true }, publishedDate: { ne: null } } }
      sort: { fields: data___publishedDate, order: DESC }
    ) {
      nodes {
        id
        data {
          title
          publishedDate(formatString: "YYYYMMDD")
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
        fields {
          slug
        }
      }
    }
    topics: allAirtableTopic(sort: { fields: data___title, order: ASC }) {
      nodes {
        id
        fields {
          slug
        }
        data {
          title
          publishedTalksCount
          talks {
            id
          }
        }
      }
    }
  }
`
