import { graphql } from 'gatsby'
import type { PageProps, HeadFC } from 'gatsby'

import { Page } from '~/components/page'
import { Pagination } from '~/components/pagination'
import { SEO } from '~/components/seo'
import { Section } from '~/components/section'
import { TalkFilter, TalkList } from '~/components/talk'
import { TextCarousel } from '~/components/text-carousel'
import { maybePluralize } from '~/utils/misc'

interface PageContext {
  currentPage: number
  slug: string
  topic: string
}

type Props = PageProps<Queries.TalksPageQuery, PageContext>

function getTalksDescription(talksCount: number, topic?: string) {
  const talksTense = maybePluralize(talksCount, 'talk', { formatSmallNumbers: true })
  const topicSuffix = topic ? ` on ${topic}` : ''

  return `Elevate your spiritual heartbeat with Christ centered ${talksTense}${topicSuffix}.`
}

function TalksPage({ data, pageContext }: Props) {
  const { talks, topics } = data
  const isTopical = topics?.nodes && pageContext?.topic

  return (
    <>
      <TextCarousel text="Jesus is Lord" />

      <Section>
        <Section.Sidebar>
          {isTopical ? <Section.Title as="h2">Talks On</Section.Title> : null}

          <Page.Title>
            <TalkFilter
              topics={topics.nodes}
              current={{
                value: pageContext.slug,
                label: pageContext.topic,
              }}
            />
          </Page.Title>

          <div className="prose mt-2">
            <p>{getTalksDescription(talks.totalCount, pageContext.topic)}</p>
          </div>
        </Section.Sidebar>

        <Section.Content>
          <TalkList talks={talks.nodes} />
          <Pagination
            className="mt-4 w-full sm:mt-6"
            pageSize={parseInt(process.env.GATSBY_PAGE_SIZE ?? '8', 8)}
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

export const Head: HeadFC<Queries.TalksPageQuery, PageContext> = ({
  data,
  location,
  pageContext,
}) => {
  const { talks } = data
  const title = pageContext.topic ? `Talks on ${pageContext.topic}` : 'Talks'
  const description = getTalksDescription(talks.totalCount, pageContext.topic)

  return <SEO title={title} description={description} location={location} />
}

export default TalksPage

export const query = graphql`
  query TalksPage($pageSize: Int = 12, $skip: Int = 0, $topic: [String]) {
    talks: allAirtableTalk(
      skip: $skip
      limit: $pageSize
      filter: {
        data: {
          publishedDate: { ne: null }
          topics: { elemMatch: { data: { title: { in: $topic } } } }
        }
      }
      sort: { data: { publishedDate: DESC } }
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
                    gatsbyImageData(width: 128, placeholder: DOMINANT_COLOR, layout: CONSTRAINED)
                  }
                }
              }
            }
          }
        }
      }
    }
    topics: allAirtableTopic(sort: { data: { title: ASC } }) {
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
