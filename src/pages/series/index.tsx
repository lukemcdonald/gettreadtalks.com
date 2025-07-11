import { graphql } from 'gatsby'
import type { PageProps, HeadFC } from 'gatsby'

import { Page } from '~/components/page'
import { SEO } from '~/components/seo'
import { Section } from '~/components/section'
import { SeriesList } from '~/components/series'

type Props = PageProps<Queries.SeriesPageQuery>

function SeriesPage({ data }: Props) {
  const { series } = data

  return (
    <Section>
      <Section.Sidebar isSticky>
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
  )
}

export const Head: HeadFC<Queries.SeriesPageQuery> = ({ data, location }) => {
  const seriesCount = data?.series?.nodes?.length || 0
  const description = `Explore ${seriesCount} sermon series featuring talks on the same topic or book of the Bible. Each series includes multiple Christ-centered messages from faithful ministers.`

  return <SEO title="Sermon Series" description={description} location={location} />
}

export default SeriesPage

export const query = graphql`
  query SeriesPage {
    series: allAirtableSerie(
      filter: { data: { title: { ne: null } } }
      sort: { data: { title: ASC } }
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
                    gatsbyImageData(width: 128, placeholder: DOMINANT_COLOR, layout: CONSTRAINED)
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
