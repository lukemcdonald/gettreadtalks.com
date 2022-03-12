import React from 'react'

import { useSiteMetadata } from 'hooks/site-metadata'

import { SiteHeader } from 'components/header'
import { SiteFooter } from 'components/footer'

function Layout({ children }) {
  const { title } = useSiteMetadata()

  return (
    <>
      <div className="bg-image-swirl fixed inset-0 z-0 bg-gray-200 bg-cover" />

      <div className="relative text-gray-700">
        <SiteHeader siteTitle={title} />
        <main className="relative z-0">{children}</main>
        <SiteFooter siteTitle={title} />
      </div>
    </>
  )
}

export default Layout
