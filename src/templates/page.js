import { graphql } from 'gatsby'
import React from 'react'

import { Page, SEO, Section } from '~/components'

function SinglePage({ data, location }) {
  const { data: page } = data.page

  return (
    <>
      <SEO
        title={page.title}
        description={page.content.childMarkdownRemark.excerpt}
        location={location}
      />

      <Section>
        <Section.Content as="article">
          <div className="prose">
            <Page.Title>{page.title}</Page.Title>
            <div
              className="prose prose-lg"
              dangerouslySetInnerHTML={{
                __html: page.content.childMarkdownRemark.html,
              }}
            />
          </div>
        </Section.Content>
      </Section>
    </>
  )
}

export default SinglePage

export const query = graphql`
  query ($id: String!) {
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
