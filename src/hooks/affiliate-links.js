import { graphql, useStaticQuery } from 'gatsby'

const affiliateLinksQuery = graphql`
  {
    links: allAirtableAffiliateLink(
      filter: { data: { title: { ne: null } } }
      sort: { fields: data___type, order: ASC }
    ) {
      nodes {
        id
        data {
          title
          subtitle
          link {
            childMarkdownRemark {
              rawMarkdownBody
            }
          }
          affiliate
          type
          productId
          description {
            childMarkdownRemark {
              excerpt
              html
            }
          }
          image {
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
`

function useAffiliateLinks() {
  const data = useStaticQuery(affiliateLinksQuery)

  const links = data.links.nodes.map(({ id, data }) => ({
    id,
    ...data,
  }))

  const randomLink = links[Math.floor(Math.random() * links.length)]

  return { links, randomLink }
}

export { useAffiliateLinks }
