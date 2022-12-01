import { graphql, useStaticQuery } from 'gatsby'

type SiteMetadata = NonNullable<Queries.SiteMetadataQuery>

const SITE_METADATA_QUERY = graphql`
  query SiteMetadata {
    site {
      siteMetadata {
        title
        description
      }
    }
  }
`

const useSiteMetadata = () => {
  const data = useStaticQuery<SiteMetadata>(SITE_METADATA_QUERY)

  return { ...data.site?.siteMetadata }
}

export { useSiteMetadata }
