import type { PageProps } from 'gatsby'
import { graphql } from 'gatsby'

import { Page } from '~/components/page'
import { SEO } from '~/components/seo'
import { Section } from '~/components/section'

type Props = PageProps<Queries.SinglePageQuery>

function SinglePage({ data, location }: Props) {
  const page = data?.page?.data

  if (!page) {
    return null
  }

  const title = page.title
  const description = page?.content?.childMarkdownRemark?.excerpt
  const content = page?.content?.childMarkdownRemark?.html || ''

  return (
    <>
      <SEO description={description} location={location} title={title} />

      <Section>
        <Section.Content as="article">
          <div className="prose">
            <Page.Title>{title}</Page.Title>
            <div className="prose prose-lg" dangerouslySetInnerHTML={{ __html: content }} />
          </div>
        </Section.Content>
      </Section>
    </>
  )
}

export default SinglePage

export const query = graphql`
  query SinglePage($id: String!) {
    page: airtablePage(id: { eq: $id }) {
      id
      fields {
        slug
      }
      data {
        title
        content {
          childMarkdownRemark {
            excerpt
            html
          }
        }
      }
    }
  }
`
