import type { ReactNode } from 'react'
import type { HeadProps } from 'gatsby'
import striptags from 'striptags'

import SchemaOrg from '~/components/seo/schema-org'
import { useSiteMetadata } from '~/hooks/site-metadata'
import { trimText } from '~/utils/misc'

const BASE_URL = process.env.BASE_URL ?? 'https://gettreadtalks.com'

interface Props {
  children?: ReactNode
  description?: string | null
  image?: string
  location: HeadProps['location']
  title?: string | null
}

function SEO({ children, description, image, location, title }: Props) {
  const { title: siteTitle, description: siteDescription } = useSiteMetadata()

  const seo = {
    title: striptags(title || siteTitle || ''),
    description: trimText(striptags(description || siteDescription || ''), 160),
    image: image || '/default-seo-image.png',
    url: location.pathname ? `${BASE_URL}${location.pathname}` : BASE_URL,
  }

  return (
    <>
      {/* General tags */}
      <title>{seo?.title !== siteTitle ? `${seo.title} — ${siteTitle}` : siteTitle}</title>
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
      <meta property="og:site_name" content={siteTitle || ''} key="ogsitename" />
      <meta property="og:description" content={seo.description} key="ogdesc" />

      {/* Twitter */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:image" content={seo.image} />
      <meta name="twitter:title" content={seo.title} />
      <meta name="twitter:description" content={seo.description} />
      <meta name="twitter:creator" content="@gettreadtalks" />

      {/* Additions and Overrides */}
      {children}

      <SchemaOrg defaultTitle={siteTitle || ''} title={seo.title} url={seo.url} />
    </>
  )
}

export default SEO
