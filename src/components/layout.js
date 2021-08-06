import React from 'react'

import { useSiteMetadata } from 'hooks/useSiteMetadata'

import { SiteHeader } from 'components/siteHeader'
import { SiteFooter } from 'components/siteFooter'

function Layout({ children }) {
	const { title } = useSiteMetadata()

	return (
		<>
			<div className="fixed inset-0 z-0 bg-gray-200 bg-cover bg-image-swirl" />

			<div className="relative text-gray-700">
				<SiteHeader siteTitle={title} />
				<main className="relative z-0">{children}</main>
				<SiteFooter siteTitle={title} />
			</div>
		</>
	)
}

export default Layout
