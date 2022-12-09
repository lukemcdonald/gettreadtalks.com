import { graphql, useStaticQuery } from 'gatsby'

const AFFILIATE_LINKS_QUERY = graphql`
  query AffiliateLinks {
    links: allAirtableAffiliateLink(
      filter: { data: { title: { ne: null } } }
      sort: { data: { type: ASC } }
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
                gatsbyImageData(width: 128, placeholder: DOMINANT_COLOR, layout: CONSTRAINED)
              }
            }
          }
        }
      }
    }
  }
`

function useAffiliateLinks() {
  const data = useStaticQuery<Queries.AffiliateLinksQuery>(AFFILIATE_LINKS_QUERY)

  const links = data.links.nodes.map(({ id, data }) => ({
    id,
    ...data,
  }))

  const randomLink = links[Math.floor(Math.random() * links.length)]

  return { links, randomLink }
}

export { useAffiliateLinks }
