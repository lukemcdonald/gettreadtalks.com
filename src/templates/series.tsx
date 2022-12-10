import type { HeadFC, PageProps } from 'gatsby'
import { graphql } from 'gatsby'

import { Intro } from '~/components/intro'
import { Section } from '~/components/section'
import { SEO } from '~/components/seo'
import { TalkList } from '~/components/talk'

type Props = PageProps<Queries.SingleSeriesPageQuery>

function SingleSeriesPage({ data }: Props) {
  const series = data?.series?.data

  if (!series) {
    return null
  }

  return (
    <>
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

export const Head: HeadFC<Queries.SingleSeriesPageQuery> = ({ data, location }) => {
  return <SEO title={data?.series?.data?.title} location={location} />
}

export default SingleSeriesPage

export const query = graphql`
  query SingleSeriesPage($id: String!) {
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
  }
`
