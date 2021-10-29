import React from 'react'
import Helmet from 'react-helmet'
import striptags from 'striptags'

import { useSiteMetadata } from 'hooks/site-metadata'
import { trimText } from 'utils/misc'
import SchemaOrg from 'components/seo/schema-org'

function SEO({ children, location, title, description, image }) {
  const { title: siteTitle, description: siteDescription } = useSiteMetadata()

  const seo = {
    title: striptags(title || siteTitle),
    description: trimText(striptags(description || siteDescription), 160),
    image: image || '/default-seo-image.png',
    url: location?.href || {},
  }

  return (
    <>
      <Helmet htmlAttributes={{ lang: 'en' }} titleTemplate={`%s — ${siteTitle}`}>
        {/* General tags */}
        <title>{seo.title}</title>
        <meta name="description" content={seo.description} />
        <meta name="image" content={seo.image} />

        {/* Fav Icons */}
        <link rel="icon" type="image/svg+xml" href="/favicon.svg" />
        <link rel="alternate icon" type="image/svg+xml" href="/favicon.svg" />

        {/* Google Verification */}
        <meta name="google-site-verification" content="dTbdp4VSVQmWmE5Zvgq2THjNtPdJrysZaC-0aGGlU0M" />

        {/* Open Graph */}
        <meta property="og:url" content={seo.url} />
        <meta property="og:image" content={seo.image} />
        <meta property="og:title" content={seo.title} key="ogtitle" />
        <meta property="og:site_name" content={siteTitle} key="ogsitename" />
        <meta property="og:description" content={seo.description} key="ogdesc" />

        {/* Twitter */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:image" content={seo.image} />
        <meta name="twitter:title" content={seo.title} />
        <meta name="twitter:description" content={seo.description} />
        <meta name="twitter:creator" content="@gettreadtalks" />

        {/* Additions and Overrides */}
        {children}
      </Helmet>

      <SchemaOrg url={seo.url} title={seo.title} defaultTitle={siteTitle} />
    </>
  )
}

export { SEO }
