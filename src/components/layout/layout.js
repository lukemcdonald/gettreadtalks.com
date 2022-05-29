import React from 'react'

import { Footer } from '~/components/footer'
import { Header } from '~/components/header'
import { useSiteMetadata } from '~/hooks/site-metadata'

function Layout({ children }) {
  const { title } = useSiteMetadata()

  return (
    <>
      <div className="bg-image-swirl fixed inset-0 z-0 bg-gray-200 bg-cover" />

      <div className="relative text-gray-700">
        <Header siteTitle={title} />
        <main className="relative z-0">{children}</main>
        <Footer siteTitle={title} />
      </div>
    </>
  )
}

export default Layout
