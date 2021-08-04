import React from 'react'
import { SiteNavigation } from 'components/siteNavigation'

function SiteHeader({ siteTitle }) {
	return (
		<header className="relative z-50 border-t-4 border-red-600 bg-gradient-to-b from-gray-50">
			<div className="container max-w-screen-xl py-6 md:py-10">
				<SiteNavigation siteTitle={siteTitle} />
			</div>
		</header>
	)
}

export { SiteHeader }
