import type { HeadFC, PageProps } from 'gatsby'
import { graphql } from 'gatsby'

import { Page } from '~/components/page'
import { SEO } from '~/components/seo'
import { Section } from '~/components/section'

type Props = PageProps<Queries.SinglePageQuery>

function SinglePage({ data }: Props) {
  const page = data?.page?.data

  if (!page) {
    return null
  }

  return (
    <Section>
      <Section.Content as="article">
        <div className="prose">
          <Page.Title>{page.title}</Page.Title>
          <div
            className="prose prose-lg"
            dangerouslySetInnerHTML={{ __html: page?.content?.childMarkdownRemark?.html || '' }}
          />
        </div>
      </Section.Content>
    </Section>
  )
}

export const Head: HeadFC<Queries.SinglePageQuery> = ({ data, location }) => {
  const page = data?.page?.data
  const title = page?.title
  const description = page?.content?.childMarkdownRemark?.excerpt

  return <SEO title={title} description={description} location={location} />
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
