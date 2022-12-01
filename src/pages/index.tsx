// Todo: Typescript https://www.gatsbyjs.com/docs/how-to/local-development/graphql-typegen/
import { useMemo } from 'react'
import { graphql } from 'gatsby'
import type { PageProps } from 'gatsby'

import { Intro } from '~/components/intro'
import { SEO } from '~/components/seo'
import { Section } from '~/components/section'
import { SpeakerList } from '~/components/speaker'
import { TalkList, TalkNav } from '~/components/talk'
import { TextCarousel } from '~/components/text-carousel'
import { arrayShuffle } from '~/utils/misc'

type Props = PageProps<Queries.IndexPageQuery>

function IndexPage({ data, location }: Props) {
  const { introImage, speakers, talks } = data

  const shuffledTalks = useMemo(() => {
    return arrayShuffle<typeof talks.nodes>(talks.nodes)
  }, [talks])
  const shuffledSpeakers = useMemo(() => {
    return arrayShuffle<typeof speakers.nodes>(speakers.nodes)
  }, [speakers])

  return (
    <>
      <SEO title="Exercise Your Inner Man" location={location} />

      <Intro image={introImage} fullscreen>
        <Intro.Title size="large">Workout your salvation.</Intro.Title>
        <Intro.Tagline>
          <p>Christ centered sermons to elevate your spiritual heartbeat.</p>
        </Intro.Tagline>
      </Intro>

      <Section className="relative">
        <TextCarousel text="Jesus Is King" />
        <Section.Sidebar isSticky>
          <Section.Title as="h2">Featured Talks</Section.Title>

          <div className="prose mb-8">
            <p>
              <strong>Don't know what to listen to?</strong> Try starting with one of these
              favorites.
            </p>
          </div>

          <TalkNav />
        </Section.Sidebar>
        <Section.Content>
          <TalkList talks={shuffledTalks.slice(0, 5)} />
        </Section.Content>
      </Section>

      <Section separator="top">
        <Section.Sidebar isSticky>
          <Section.Title as="h2">Featured Speakers</Section.Title>

          <p className="prose">
            Have you listened to one of these faithful ministers of the Gospel?
          </p>
        </Section.Sidebar>

        <Section.Content align="wide">
          <SpeakerList className="xl:grid-cols-3" speakers={shuffledSpeakers.slice(0, 6)} />
        </Section.Content>
      </Section>
    </>
  )
}

export default IndexPage

export const query = graphql`
  query IndexPage {
    talks: allAirtableTalk(
      filter: { data: { favorite: { eq: true }, publishedDate: { ne: null } } }
      sort: { fields: data___publishedDate, order: DESC }
    ) {
      nodes {
        id
        fields {
          slug
        }
        data {
          title
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
    speakers: allAirtableSpeaker(
      filter: { data: { favorite: { eq: true }, title: { ne: null } } }
      sort: { fields: data___lastName, order: ASC }
    ) {
      nodes {
        id
        fields {
          slug
        }
        data {
          title
          ministry
          website
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
    introImage: file(relativePath: { eq: "billy-graham-preaching-header.jpg" }) {
      childImageSharp {
        gatsbyImageData(
          placeholder: TRACED_SVG
          transformOptions: { grayscale: true }
          layout: FULL_WIDTH
        )
      }
    }
  }
`
