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
  const series = data?.series?.data
  const talkCount = series?.talks?.length || 0
  const description = series
    ? `Listen to the "${series.title}" series featuring ${talkCount} Christ-centered talks from TREAD Talks.`
    : 'Listen to this series of Christ-centered talks from TREAD Talks.'
  const BASE_URL = process.env.BASE_URL ?? 'https://gettreadtalks.com'

  const structuredData = series
    ? [
        {
          '@context': 'https://schema.org',
          '@type': 'CreativeWorkSeries',
          name: series.title,
          description: description,
          url: `${BASE_URL}${location.pathname}`,
          numberOfItems: talkCount,
          publisher: {
            '@type': 'Organization',
            name: 'TREAD Talks',
            url: BASE_URL,
          },
          about: {
            '@type': 'Thing',
            name: 'Christian Sermon Series',
          },
          keywords: [
            'sermon series',
            'christian',
            'bible',
            'faith',
            'gospel',
            'religious',
            series.title,
          ].filter(Boolean),
          inLanguage: 'en',
          isAccessibleForFree: true,
          ...(series.talks &&
            series.talks.length > 0 && {
              hasPart: series.talks
                .filter((talk) => talk?.data?.title && talk?.fields?.slug)
                .map((talk) => ({
                  '@type': 'AudioObject',
                  name: talk?.data?.title || 'Untitled Talk',
                  url: `${BASE_URL}${talk?.fields?.slug}`,
                })),
            }),
        },
      ]
    : []

  return (
    <SEO
      title={series?.title}
      description={description}
      location={location}
      structuredData={structuredData}
    />
  )
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
