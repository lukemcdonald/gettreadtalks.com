import React from 'react'
import { graphql } from 'gatsby'

import { maybePluralize } from 'utils/misc'

import { Page } from 'components/page'
import { Pagination } from 'components/pagination'
import { Section } from 'components/section'
import { SEO } from 'components/seo'
import { TalksFilter } from 'components/talks/filter'
import { TalksList } from 'components/talks/list'
import { TextCarousel } from 'components/text-carousel'

function TalksPage({ data, location, pageContext }) {
  const { talks, topics } = data
  const isTopical = topics?.nodes && pageContext?.topic
  const description = `Elevate your spiritual heartbeat with ${maybePluralize(
    talks.totalCount,
    'Christ centered talk',
    {
      formatSmallNumbers: true,
    },
  )}${isTopical ? ` on ${pageContext.topic}` : ''}.`

  return (
    <>
      <SEO title="Talks" description={description} location={location} />

      <TextCarousel text="Jesus is Lord" />

      <Section>
        <Section.Sidebar>
          {isTopical && <Section.Heading as="h2">Talks On</Section.Heading>}

          <Page.Title>
            <TalksFilter
              topics={topics.nodes}
              current={{
                value: pageContext.slug,
                label: pageContext.topic,
              }}
            />
          </Page.Title>

          <div className="mt-2 prose">
            <p>{description}</p>
          </div>
        </Section.Sidebar>

        <Section.Content>
          <TalksList talks={talks.nodes} />
          <Pagination
            className="w-full mt-4 sm:mt-6"
            pageSize={parseInt(process.env.GATSBY_PAGE_SIZE)}
            totalCount={talks.totalCount}
            currentPage={pageContext.currentPage || 1}
            base="/talks"
            showPageNumbers
          />
        </Section.Content>
      </Section>
    </>
  )
}

export default TalksPage

export const query = graphql`
  query ($pageSize: Int = 12, $skip: Int = 0, $topic: [String]) {
    talks: allAirtableTalk(
      skip: $skip
      limit: $pageSize
      filter: { data: { publishedDate: { ne: null }, topics: { elemMatch: { data: { title: { in: $topic } } } } } }
      sort: { fields: data___publishedDate, order: DESC }
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
          publishedDate(formatString: "YYYYMMDD")
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
