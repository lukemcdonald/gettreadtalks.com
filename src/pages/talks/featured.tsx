import { graphql } from 'gatsby'
import type { PageProps, HeadFC } from 'gatsby'

import { Page } from '~/components/page'
import { SEO } from '~/components/seo'
import { Section } from '~/components/section'
import { TalkFilter, TalkList } from '~/components/talk'

type Props = PageProps<Queries.FeaturedTalksPageQuery>

function FeaturedTalksPage({ data }: Props) {
  const { talks, topics } = data

  return (
    <Section>
      <Section.Sidebar isSticky>
        <Page.Title className="relative">
          <TalkFilter
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
        <TalkList talks={talks.nodes} />
      </Section.Content>
    </Section>
  )
}

export const Head: HeadFC = ({ location }) => {
  return <SEO title="Featured Talks" location={location} />
}

export default FeaturedTalksPage

export const query = graphql`
  query FeaturedTalksPage {
    talks: allAirtableTalk(
      filter: { data: { favorite: { eq: true }, publishedDate: { ne: null } } }
      sort: { data: { publishedDate: DESC } }
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
                    gatsbyImageData(width: 128, placeholder: DOMINANT_COLOR, layout: CONSTRAINED)
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
