import * as React from 'react'
import { Helmet } from 'react-helmet'

function SchemaOrg({
  defaultTitle,
  title,
  url,
}: {
  defaultTitle: string
  title: string
  url: string
}) {
  const schema = [
    {
      '@context': 'http://schema.org',
      '@type': 'WebSite',
      url,
      name: title,
      alternateName: defaultTitle,
    },
  ]

  return (
    <Helmet>
      {/* Schema.org tags */}
      <script type="application/ld+json">{JSON.stringify(schema)}</script>
    </Helmet>
  )
}

export default React.memo(SchemaOrg)
