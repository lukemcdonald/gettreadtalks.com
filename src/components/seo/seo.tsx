import type { PropsWithChildren } from 'react'
import type { HeadProps } from 'gatsby'
import striptags from 'striptags'

import { useSiteMetadata } from '~/hooks/site-metadata'
import { trimText } from '~/utils/misc'

const BASE_URL = process.env.BASE_URL ?? 'https://gettreadtalks.com'

interface Props {
  description?: string | null
  image?: string
  location: HeadProps['location']
  title?: string | null
  structuredData?: Record<string, any>[]
}

function SEO({
  children,
  description,
  image,
  location,
  title,
  structuredData,
}: PropsWithChildren<Props>) {
  const { title: siteTitle, description: siteDescription } = useSiteMetadata()

  const seo = {
    title: striptags(title || siteTitle || ''),
    description: trimText(striptags(description || siteDescription || ''), 160),
    image: image || '/default-seo-image.png',
    url: location.pathname ? `${BASE_URL}${location.pathname}` : BASE_URL,
  }

  const baseSchemaOrg = [
    {
      '@context': 'https://schema.org',
      '@type': 'WebSite',
      url: seo.url,
      name: seo.title,
      alternateName: siteTitle || '',
    },
    {
      '@context': 'https://schema.org',
      '@type': 'Organization',
      name: 'TREAD Talks',
      url: BASE_URL,
      description:
        'Exercise your inner man with Christ centered sermons to elevate your spiritual heartbeat while working out your physical one.',
      logo: `${BASE_URL}/logo.png`,
      sameAs: [
        'https://twitter.com/gettreadtalks',
        'https://www.facebook.com/gettreadtalks',
        'https://www.instagram.com/gettreadtalks',
      ],
    },
  ]

  const schemaOrg = structuredData ? [...baseSchemaOrg, ...structuredData] : baseSchemaOrg

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

      {/* Schema.org tags */}
      <script type="application/ld+json">{JSON.stringify(schemaOrg)}</script>
    </>
  )
}

export default SEO
